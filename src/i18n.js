import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import ta from "./locales/ta/translation.json";
import te from "./locales/te/translation.json";
import hi from "./locales/hi/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ta: {
        translation: ta,
      },
      te: {
        translation: te,
      },
      hi: {
        translation: hi,
      },
    },

    fallbackLng: "en",

    lng: localStorage.getItem("language") || "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;