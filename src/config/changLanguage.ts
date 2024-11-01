export const changeLanguage = (i18n: any, lang: string) => {
    i18n.locale = lang;
    localStorage.setItem('language', lang);
};
