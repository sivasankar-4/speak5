// =========================================================
// Speak5 — Main Application Entry & Routing
// =========================================================

import { RouterProvider, useRouter } from './app/router';
import { AppProvider, useAppState } from './app/store';

// Feature screens
import {
  OnboardingGoals,
  OnboardingComfort,
  OnboardingDuration,
  OnboardingBaselineIntro,
} from './features/onboarding';
import { HomeScreen } from './features/home/HomeScreen';
import { PracticeScreen } from './features/home/PracticeScreen';
import { ProgressScreen } from './features/home/ProgressScreen';
import {
  ChallengeDetailScreen,
  FrameworkScreen,
  PrepScreen,
} from './features/challenges';
import { RecordingScreen, RecordDoneScreen } from './features/recording';
import { ProcessingScreen } from './features/processing';
import { ResultsScreen, ReviewScreen } from './features/results';
import { HistoryScreen } from './features/history';
import { ProfileScreen } from './features/profile';

function AppRoutes() {
  const { screen } = useRouter();
  const { state } = useAppState();

  // If user hasn't completed onboarding and is accessing the app without explicit route, route them to onboarding
  let activeScreen = screen;
  if (!state.onboardingComplete && (!window.location.hash || window.location.hash === '#/home')) {
    activeScreen = 'onboarding_goals';
  }

  switch (activeScreen) {
    case 'onboarding_goals':
      return <OnboardingGoals />;
    case 'onboarding_comfort':
      return <OnboardingComfort />;
    case 'onboarding_duration':
      return <OnboardingDuration />;
    case 'onboarding_baseline_intro':
      return <OnboardingBaselineIntro />;
    case 'home':
      return <HomeScreen />;
    case 'practice':
      return <PracticeScreen />;
    case 'progress':
      return <ProgressScreen />;
    case 'history':
      return <HistoryScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'challenge_detail':
      return <ChallengeDetailScreen />;
    case 'framework':
      return <FrameworkScreen />;
    case 'prep':
      return <PrepScreen />;
    case 'recording':
      return <RecordingScreen />;
    case 'record_done':
      return <RecordDoneScreen />;
    case 'processing':
      return <ProcessingScreen />;
    case 'results':
      return <ResultsScreen />;
    case 'review':
      return <ReviewScreen />;
    default:
      return <HomeScreen />;
  }
}

export function App() {
  return (
    <AppProvider>
      <RouterProvider initialScreen="home">
        <AppRoutes />
      </RouterProvider>
    </AppProvider>
  );
}

export default App;
