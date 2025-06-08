import React from 'react';
import { I18nextProvider as I18nProvider } from 'react-i18next';
import i18n from '../i18n';

interface I18nextProviderProps {
  children: React.ReactNode;
}

export const I18nextProvider: React.FC<I18nextProviderProps> = ({ children }) => {
  return (
    <I18nProvider i18n={i18n}>
      {children}
    </I18nProvider>
  );
};
