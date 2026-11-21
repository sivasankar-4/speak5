// =========================================================
// Speak5 — Hash-based Router
// =========================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ScreenId =
  | 'onboarding_goals'
  | 'onboarding_comfort'
  | 'onboarding_duration'
  | 'onboarding_baseline_intro'
  | 'home'
  | 'practice'
  | 'progress'
  | 'history'
  | 'profile'
  | 'challenge_detail'
  | 'framework'
  | 'prep'
  | 'recording'
  | 'record_done'
  | 'processing'
  | 'results'
  | 'review';

export interface RouteState {
  screen: ScreenId;
  params: Record<string, string>;
}

interface RouterContextValue {
  screen: ScreenId;
  params: Record<string, string>;
  navigate: (screen: ScreenId, params?: Record<string, string>) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function parseHash(hashStr: string): RouteState {
  const hash = hashStr.replace(/^#\/?/, '');
  if (!hash) {
    return { screen: 'home', params: {} };
  }
  const [screenPart, queryPart] = hash.split('?');
  const screen = (screenPart || 'home') as ScreenId;
  const params: Record<string, string> = {};
  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
  }
  return { screen, params };
}

function buildHash(screen: ScreenId, params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) {
    return `#/${screen}`;
  }
  const searchParams = new URLSearchParams(params);
  return `#/${screen}?${searchParams.toString()}`;
}

export const RouterProvider: React.FC<{ children: React.ReactNode; initialScreen?: ScreenId }> = ({
  children,
  initialScreen,
}) => {
  const [route, setRoute] = useState<RouteState>(() => {
    if (window.location.hash) {
      return parseHash(window.location.hash);
    }
    return { screen: initialScreen || 'home', params: {} };
  });

  const [historyStack, setHistoryStack] = useState<RouteState[]>([route]);

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash);
      setRoute(parsed);
      setHistoryStack(prev => [...prev, parsed]);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((screen: ScreenId, params?: Record<string, string>) => {
    const newHash = buildHash(screen, params);
    window.location.hash = newHash;
    const nextRoute = { screen, params: params || {} };
    setRoute(nextRoute);
    setHistoryStack(prev => [...prev, nextRoute]);
  }, []);

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop(); // current
      const prev = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      setRoute(prev);
      window.location.hash = buildHash(prev.screen, prev.params);
    } else {
      navigate('home');
    }
  }, [historyStack, navigate]);

  return (
    <RouterContext.Provider
      value={{
        screen: route.screen,
        params: route.params,
        navigate,
        goBack,
        canGoBack: historyStack.length > 1,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
