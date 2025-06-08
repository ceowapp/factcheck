import React from 'react';
import { ReduxProvider, SafeAreaProvider, ToastProvider, I18nextProvider } from '../providers';
import { enableScreens } from 'react-native-screens';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import navigationRef from '../navigation/RootNavigation';
import RootNavigation from '../navigation';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import CommonManager from '../manager/commonManager';
import AppStateHandler from '../services/appstate';

enableScreens();

const theme = {
  ...MD3DarkTheme,
};
const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

export default function RootLayout() {
  return (
    <ReduxProvider>
      <I18nextProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer ref={navigationRef} theme={LightTheme}>
            <SafeAreaProvider>
              <CommonManager>
                <ToastProvider>
                  <AppStateHandler />
                  <RootNavigation />
                </ToastProvider>
              </CommonManager>
            </SafeAreaProvider>
          </NavigationContainer>
        </PaperProvider>
      </I18nextProvider>
    </ReduxProvider>
  );
}
