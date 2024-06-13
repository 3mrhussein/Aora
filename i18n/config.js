import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import your translation files
import en from '../locales/en.json';
import ar from '../locales/ar.json';

// Setup i18n
i18n
  .use(initReactI18next) // Integrates i18next with React
  .init({
    compatibilityJSON: 'v3', // Necessary for compatibility with older JSON structures
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    lng: Localization.locale.split('-')[0], // Detect the user's language
    fallbackLng: 'en', // Fallback language if detection fails
    interpolation: {
      escapeValue: false, // React already escapes strings
    },
    debug: true,
  });

export default i18n;
