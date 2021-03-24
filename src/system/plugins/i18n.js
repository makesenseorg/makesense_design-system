/* eslint-disable */

// use in component as this.$MKSlocale['date']; 

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
            toggleBold: 'Gras',
            toggleItalic: 'Italique',
            toggleUnderline: 'Souligner',
            toggleBlockquote: 'Bloc de citation',
            toggleOrderedList: 'Liste ordonnée',
            toggleBulletedList: 'Liste à points',
            addImage: 'Image',
        },
        en: {
            date: 'Calendar date',
            externalLink: 'External link',
            loading: 'Loading...',
            currentPage: 'Current page:',
            event: 'Event',
            pastEvent: 'Past event',
            search: 'Search',
            toggleBold: 'Toggle bold',
            toggleItalic: 'Toggle italic',
            toggleUnderline: 'Toggle underline',
            toggleBlockquote: 'Toggle blockquote',
            toggleOrderedList: 'Toggle ordered list',
            toggleBulletedList: 'Toggle bullet list',
            addImage: 'Add image',
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
