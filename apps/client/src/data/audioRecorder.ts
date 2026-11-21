// =========================================================
// Speak5 — Audio Recording Service
// Real voice-only recording using @independo/capacitor-voice-recorder v8
// Stored in app-private storage via @capacitor/filesystem
// Supports web browser fallback with MediaRecorder
// =========================================================

import { VoiceRecorder } from '@independo/capacitor-voice-recorder';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

export interface AudioRecordResult {
  /** Record identifier */
  id: string;
  /** Relative filename in private storage */
  fileName: string;
  /** Duration in seconds */
  durationSec: number;
  /** MIME type of the recorded audio */
  mimeType: string;
  /** Raw base64 data for immediate playback */
  base64Audio: string;
}

class AudioRecordingService {
  private currentRecordingId: string | null = null;
  private currentFileName: string | null = null;
  private startTime: number = 0;
  private isCurrentlyRecording: boolean = false;

  // Web MediaRecorder fallback state
  private webMediaRecorder: MediaRecorder | null = null;
  private webAudioChunks: Blob[] = [];

  /** Check if device has microphone capability */
  async canRecord(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        const can = await VoiceRecorder.canDeviceVoiceRecord();
        return can.value;
      }
      return typeof navigator !== 'undefined' && !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia;
    } catch {
      return false;
    }
  }

  /** Check permission status */
  async hasPermission(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        const status = await VoiceRecorder.hasAudioRecordingPermission();
        return status.value;
      }
      return true;
    } catch {
      return false;
    }
  }

  /** Request microphone permission right before recording */
  async requestPermission(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        const status = await VoiceRecorder.requestAudioRecordingPermission();
        return status.value;
      }
      if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      return false;
    }
  }

  /** Start real voice recording */
  async startRecording(recordId: string): Promise<boolean> {
    try {
      this.currentRecordingId = recordId;
      this.startTime = Date.now();

      if (Capacitor.isNativePlatform()) {
        const res = await VoiceRecorder.startRecording();
        this.isCurrentlyRecording = res.value;
        return res.value;
      } else {
        // Web fallback
        if (!navigator.mediaDevices) return false;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.webAudioChunks = [];
        this.webMediaRecorder = new MediaRecorder(stream);
        this.webMediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) this.webAudioChunks.push(e.data);
        };
        this.webMediaRecorder.start();
        this.isCurrentlyRecording = true;
        return true;
      }
    } catch (err) {
      console.error('Failed to start recording:', err);
      this.isCurrentlyRecording = false;
      return false;
    }
  }

  /** Stop recording and save audio file to app-private storage */
  async stopRecording(): Promise<AudioRecordResult | null> {
    if (!this.isCurrentlyRecording) return null;

    try {
      let base64 = '';
      let mimeType = 'audio/aac';
      const durationSec = Math.max(1, Math.round((Date.now() - this.startTime) / 1000));

      if (Capacitor.isNativePlatform()) {
        const res = await VoiceRecorder.stopRecording();
        if (!res.value || !res.value.recordDataBase64) {
          throw new Error('No audio data received');
        }
        base64 = res.value.recordDataBase64;
        mimeType = res.value.mimeType || 'audio/aac';
      } else {
        // Web fallback: finish blob
        if (this.webMediaRecorder && this.webMediaRecorder.state !== 'inactive') {
          await new Promise<void>((resolve) => {
            if (!this.webMediaRecorder) return resolve();
            this.webMediaRecorder.onstop = () => resolve();
            this.webMediaRecorder.stop();
          });
          const blob = new Blob(this.webAudioChunks, { type: 'audio/webm' });
          base64 = await this.blobToBase64(blob);
          mimeType = 'audio/webm';
        }
      }

      const id = this.currentRecordingId || 'rec_' + Date.now();
      const ext = mimeType.includes('webm') ? 'webm' : 'm4a';
      const fileName = `speak5_rec_${id}.${ext}`;

      // Save to device private app-data directory (no external access, strictly app-private)
      try {
        await Filesystem.writeFile({
          path: fileName,
          data: base64,
          directory: Directory.Data,
        });
      } catch (fileErr) {
        console.warn('Filesystem write failed, keeping in memory:', fileErr);
      }

      this.currentFileName = fileName;
      this.isCurrentlyRecording = false;

      return {
        id,
        fileName,
        durationSec,
        mimeType,
        base64Audio: base64,
      };
    } catch (err) {
      console.error('Failed to stop recording:', err);
      this.isCurrentlyRecording = false;
      return null;
    }
  }

  /** Delete audio recording file from private storage */
  async deleteRecording(fileName: string): Promise<boolean> {
    try {
      if (!fileName) return true;
      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Data,
      });
      return true;
    } catch {
      // File might already be deleted or not yet written
      return false;
    }
  }

  /** Delete currently buffered temporary recording */
  async discardCurrentRecording(): Promise<void> {
    if (this.currentFileName) {
      await this.deleteRecording(this.currentFileName);
    }
    this.currentFileName = null;
    this.currentRecordingId = null;
    this.isCurrentlyRecording = false;
  }

  /** Read saved recording from private storage as base64 */
  async getRecordingData(fileName: string): Promise<string | null> {
    try {
      const res = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data,
      });
      if (typeof res.data === 'string') {
        return res.data;
      }
      return null;
    } catch (err) {
      console.warn('Could not read audio file:', fileName, err);
      return null;
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        const base64 = res.split(',')[1] || '';
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export const audioRecorder = new AudioRecordingService();
