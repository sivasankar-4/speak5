# Speak5

**Speak5** is an Android-first mobile speaking and communication coach designed to help users build clarity, cadence, and confidence through deliberate, structured practice.

It implements a proven, signature practice loop:  
**Challenge → Learn Framework → Prepare → Record & Speak → Evidence-Backed Feedback → Retry → Compare.**

---

## 🌟 Key Features

- **Structured Speaking Challenges**: Practice impromptu talking, concise status updates, executive pitches, and structured problem solving.
- **Thinking Frameworks**: Learn and apply battle-tested mental models (e.g., *PREP* — Point, Reason, Example, Point; *STAR* method).
- **Guided Preparation & Recording**: Built-in prompt cards, countdown timers, and live voice recording via native device microphone APIs.
- **Evidence-Backed Feedback**: Actionable insights on speech cadence, pace (WPM), filler word usage, and structure alignment.
- **Iterative Improvement**: Practice retry loops and track progression over time with session history and metrics.
- **Offline & Privacy-First Architecture**: Local-first storage model; audio processing and coaching interfaces designed to protect user privacy without hardcoded secrets.

---

## 🏗️ Architecture & Tech Stack

Speak5 is structured as a modular repository, starting with a cross-platform mobile client:

### **Client (`apps/client`)**
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Mobile Runtime**: [Capacitor 8](https://capacitorjs.com/) (targeting Android)
- **Audio & Media**: Native audio capture using `@independo/capacitor-voice-recorder` with fallback to Web MediaRecorder API
- **Design & Styling**: Custom design system tokens (`tokens.css`) ported from the Cadence design reference

### **Backend (Planned / In Roadmap)**
- **Runtime**: Java 21 + Spring Boot (Modular Monolith)
- **Database**: PostgreSQL (via Flyway migrations)
- **AI / Speech Services**: Pluggable `TranscriptionProvider` and `CoachingProvider` architectures for on-device and privacy-first cloud speech processing.

---

## 📂 Project Structure

```text
speak5/
├── apps/
│   └── client/                     # React + Vite frontend application
│       ├── android/                # Native Android Capacitor project
│       ├── public/                 # Static assets & icons
│       └── src/
│           ├── app/                # App entry, routing, and state stores
│           ├── components/         # Shared UI components & design system
│           ├── data/               # Local persistence & audio recording helpers
│           ├── features/           # Feature-driven screen modules
│           │   ├── challenges/     # Challenge library & selection
│           │   ├── history/        # Past attempt logs & comparisons
│           │   ├── home/           # Dashboard, practice, and progress tabs
│           │   ├── onboarding/     # Intro and goal setting
│           │   ├── recording/      # Prompts, timers, and recording interface
│           │   └── results/        # Breakdown of scores, pace, and feedback
│           └── styles/             # Global tokens and layout styling
├── docs/                           # Architecture specs, setup guides & prototypes
│   ├── Speak5_Implementation_Setup.md
│   └── design-reference/           # Approved Cadence prototype
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Android Studio](https://developer.android.com/studio) (for running on an Android emulator or device)
- JDK 17+ or 21

### 1. Clone the Repository

```bash
git clone https://github.com/sivasankar-4/speak5.git
cd speak5
```

### 2. Install Client Dependencies

```bash
cd apps/client
npm install
```

### 3. Run Web Development Server

To preview and interact with the application in your browser:

```bash
npm run dev
```

Visit the displayed local URL (typically `http://localhost:5173`).

---

## 📱 Running on Android

To run the app on an Android device or emulator using Capacitor:

### 1. Build the Web Assets

```bash
cd apps/client
npm run build
```

### 2. Sync Web Assets with Capacitor

```bash
npx cap sync android
```

### 3. Open in Android Studio

```bash
npx cap open android
```

From Android Studio, click **Run** (or press `Shift + F10`) to build and deploy to your connected device or emulator.

---

## 📜 Development Guidelines

- **Privacy & Security**: Never commit API keys or personal credentials into source code.
- **Component Styling**: Always make use of design tokens defined in `src/styles/tokens.css` to keep visual styling consistent across screens.
- **Cross-Platform Readiness**: Audio handling must account for both browser environments and native mobile permissions.

---

## 📄 License

This project is licensed under the terms of the project owners.
