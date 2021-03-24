/* eslint-disable */

export default {
  install(Vue) {
    const localeObservable = Vue.observable({
      locales: {
        fr: {
            date: 'Date du calendrier',
            externalLink: 'Lien externe',
            loading: 'Chargement...',
            currentPage: 'Page actuelle:',
            event: 'Évènement',
            pastEvent: 'Évènement terminé',
            search: 'Rechercher',
        },
        en: {
            date: 'Calendar date',
            externalLink: 'External link',
            loading: 'Loading...',
            currentPage: 'Current page:',
            event: 'Event',
            pastEvent: 'Past event',
            search: 'Search',
        },
      },
      current: "fr",
    });
    Vue.prototype.$MKSaddLocale = (name, locale) => {
      Vue.set(localeObservable.locales, name, locale);
    };
    Vue.prototype.$MKSsetLocale = (locale) => {
      localeObservable.current = locale;
    };
    Vue.mixin({
      computed: {
        $MKSlocales() {
            return Object.keys(localeObservable.locales);
        },
        $MKSallLocales() {
          return localeObservable.locales;
        },
        $MKScurrentLocale() {
            return localeObservable.current;
        },
        $MKSlocale() {
          return localeObservable.locales[localeObservable.current];
        },
      },
    });
  },
};
