import { App } from 'vue';
import { createI18n, I18n } from 'vue-i18n';
import en from '../locales/en.js';
import vi from '../locales/vi.js';

const messages = {
  en,
  vi,
};

export const i18nPlugin = {
  install(app: App) {
    const savedLanguage = localStorage.getItem('language') || 'vi';
    const i18n: I18n = createI18n({
      locale: savedLanguage,
      messages,
    });

    app.use(i18n);
  },
};
