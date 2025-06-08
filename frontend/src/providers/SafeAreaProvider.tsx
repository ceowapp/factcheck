import React from 'react';
import {
  SafeAreaProvider as AppSafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

interface SafeAreaProviderProps {
  children: React.ReactNode;
}

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({ children }) => {
  return (
    <AppSafeAreaProvider initialMetrics={initialWindowMetrics}>
      {children}
    </AppSafeAreaProvider>
  );
};
