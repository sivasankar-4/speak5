# Speak5 — Implementation Setup

## Goal
Turn the approved Cadence HTML prototype into a maintainable Android-first app while preserving the current visual identity and the signature learning loop:

**Challenge → learn a thinking framework → prepare → speak → evidence-backed feedback → retry → compare.**

The prototype is a design/behavior reference. Recording, analysis, and AI coaching must be treated as simulated until implemented for real.

## Recommended stack

### Client
- React + TypeScript + Vite
- Capacitor for the Android app shell
- Keep the existing CSS design tokens and visual direction; do not redesign the UI during the first implementation pass.
- Use a small routing solution for screen navigation.
- Use browser/local-device persistence behind a repository interface for guest sessions. Keep the storage implementation replaceable so it can be upgraded to native SQLite if requirements justify it.
- Use native/device recording APIs behind a `RecordingService` interface. Verify microphone/camera permission and MediaRecorder behavior on a real Android device early.

Why this stack: the approved prototype is HTML/CSS/JavaScript, so React + Capacitor offers a path to reuse its visual work and package it as an Android app without rebuilding every screen in native UI. Capacitor documents the React workflow and recommends keeping native platform projects under source control: https://capacitorjs.com/solution/react

### Backend
- Java 21
- Current supported Spring Boot stable release selected through Spring Initializr
- Maven
- Spring Web and Validation initially
- PostgreSQL when persistent account/session APIs are introduced
- Flyway for schema migrations once the database is added
- Spring Security for account/API protection before production authentication is shipped

Keep this as a modular monolith, not microservices. Do not add Redis, Kafka, Kubernetes, or a message broker for V1.

### AI and speech processing
- The client must never contain a commercial AI API key.
- Define interfaces such as `TranscriptionProvider` and `CoachingProvider` so providers can be replaced without rewriting the UI.
- Start with deterministic metrics and a mock/sample coaching provider while screens and contracts are developed. Do not label sample feedback as analysis of the user's voice.
- Choose the real transcription approach only after a small device feasibility test comparing on-device recognition/model options and cloud transcription, including privacy, language support, accuracy, app size, and cost.
- Any cloud AI/transcription request must have a clear consent/disclosure path and send only the data necessary for that operation.

## Repository shape

```text
speak5/
  apps/
    client/
      src/
        app/                  # App shell, routing, shared state
        components/           # Shared UI components
        features/
          onboarding/
          home/
          challenges/
          preparation/
          recording/
          processing/
          coaching/
          attempts/
          progress/
          history/
          profile/
        services/
          recording/
          transcription/
          coaching/
        data/
          repositories/       # Local session/preferences interfaces
        styles/               # Design tokens and shared styling
      android/                # Capacitor Android project, committed to Git
  backend/
    src/main/java/com/speak5/
      health/
      coaching/
      sessions/
      auth/                    # Add when account work begins
      storage/                 # Add when saved cloud recordings begin
    src/main/resources/
  docs/
    product-spec.md
    architecture.md
    privacy-data-map.md
  README.md
  .gitignore
```

## Implementation sequence

### Milestone 0 — Project bootstrap
- Create the repository and app skeleton.
- Port the current theme tokens, fonts, buttons, cards, and navigation into reusable components.
- Add Capacitor and create the Android project.
- Confirm the app starts as a web preview and as an Android app.
- Check in the Android native project and establish a reproducible README.

**Acceptance:** clean install/build succeeds; app launches on an Android device; existing visual direction is recognizable; no real camera/microphone access is requested yet.

### Milestone 1 — Real navigation and local state
- Port the approved screens without changing product decisions.
- Make onboarding choices affect the Home recommendation.
- Keep challenge templates and thinking frameworks as structured data, separate from JSX.
- Add local persistence for goals, preferred duration, sessions, attempts, and feedback.
- Correct scroll-safe areas and bottom navigation/CTA layout.

**Acceptance:** a user can complete onboarding, see a goal-relevant challenge, navigate the core flow, and retain demo/local history after restart.

### Milestone 2 — Real recording spike
- Implement voice-only recording first, then video + microphone.
- Support 2/5/10 minute speaking limits appropriate to the selected challenge.
- No pause/resume control.
- Provide countdown, elapsed timer, recording indicator, finish and discard.
- Request permissions only after a short explanation.
- Test permission denial, app backgrounding, interruption, empty/very short recordings, device storage, and cleanup on an actual Android device.

**Acceptance:** the saved temporary audio/video is actually produced and playable; finishing/discarding behaves correctly; raw recording is deleted by default after processing unless the user explicitly chooses to keep it.

### Milestone 3 — Transcription and deterministic metrics
- Add `TranscriptionProvider` with a mock implementation and one real implementation selected after the feasibility test.
- Calculate word count and WPM deterministically from transcript and speaking duration.
- Implement a conservative initial filler vocabulary; do not count every occurrence of words like “like” as a filler without context.
- Define pause metrics only if the selected transcription/audio path can measure them reliably. Do not manufacture pause measurements from transcript text alone.

**Acceptance:** results clearly distinguish measured values from unavailable metrics; failures are recoverable; no fake metrics are presented as real.

### Milestone 4 — Evidence-backed coaching and retry comparison
- Implement `CoachingProvider` on the backend so no provider key ships in the app.
- Input: current prompt, transcript, objective metrics, selected goal, relevant structured history, and the chosen thinking framework.
- Output: one strength, one priority improvement, an exact supporting excerpt, one technique, and a short illustrative revision.
- Validate the output structure and ensure cited excerpts actually occur in the transcript. Fall back gracefully on invalid/unavailable AI responses.
- Preserve attempts separately and provide an honest qualitative comparison. Do not use an arbitrary overall communication/confidence score.

**Acceptance:** coaching is based on the current user's transcript, not static demo data; retry creates a separate attempt and comparison references the correct attempts.

### Milestone 5 — Accounts, sync, and cloud recording storage
- Add Google and email/password authentication, verification, and password recovery.
- Migrate guest data only after explicit account creation/migration.
- Sync account history across devices with idempotent API operations and conflict handling.
- Upload recordings only when a user explicitly opts to save them; keep object storage private.
- Implement session deletion and account deletion, including derived-profile cleanup and documented backup/provider retention handling.

**Acceptance:** migration does not duplicate sessions; local guest history survives ordinary app navigation/offline use; account data syncs; deletes propagate; recordings cannot be accessed by another account.

### Milestone 6 — Release readiness
- Add automated tests for metrics, progression rules, repository behavior, authorization, and deletion.
- Test permissions, process/app interruption, poor network, AI/transcription outage, and low-storage behavior.
- Add a privacy policy and accurate Play Store Data safety disclosures before publication.
- Verify all AI/transcription vendor retention and data-use settings.
- Build a signed Android release and follow the then-current Play Console publication/testing requirements.

## Important product rules to preserve
- No separate welcome screen; onboarding begins with goals.
- Guest-first; account prompt after the first meaningful result and do not repeat it after “Maybe later” unless user opens an account-related feature.
- Baseline: unguided two-minute self-introduction; baseline does not count toward challenge difficulty progression or the practice streak.
- Practice duration: 2, 5, or 10 minutes; duration can change per session and is separate from difficulty.
- Recording cannot be paused.
- Recording screen does not show live WPM/filler/confidence scores.
- Raw video is deleted by default; saving is explicit. Never promise that data is “never shared” if transcription/AI requests leave the device.
- Do not use arbitrary confidence, intelligence, personality, charisma, or overall “good speaker” scores.
- AI input is the current session plus structured historical profile and relevant context—not the entire raw session history.
- Delete a session's transcript, feedback, metrics, saved recording, and derived-profile contribution as applicable.
- The baseline is a reference point, not an ordinary practice attempt.
- AI feedback must cite actual transcript evidence and teach one concrete technique.
- Sample/demo feedback must be clearly labelled and must never be represented as analysis of the user's actual recording.

## First task for a coding agent

**Work only on Milestone 0 and the smallest part of Milestone 1 needed to prove the setup.** Do not implement authentication, cloud storage, real AI, or a complete recording pipeline yet.

1. Inspect the supplied `Speak5 Cadence Prototype.html` and preserve its design tokens, colors, typography, and overall layouts.
2. Create the React + TypeScript + Vite app and add Capacitor Android support.
3. Build reusable app shell, buttons/cards, navigation, and one end-to-end navigable path: goals → comfort → preferred duration → baseline intro → Home → challenge/framework → preparation → sample feedback → retry/compare.
4. Keep sample analysis clearly marked as sample data.
5. Add README instructions for installing dependencies, running web preview, building, syncing Capacitor, and opening Android Studio.
6. Add no paid services and no embedded secrets.
7. Run the build, fix all errors, and report exactly which commands were run and which checks passed. Do not claim that Android device recording works until tested on a real device.

Before adding dependencies, explain their purpose in the README. Keep the changes focused, avoid rewriting product decisions, and do not add features absent from the specification.
