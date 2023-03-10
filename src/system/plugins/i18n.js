import { reactive } from "vue";

export default {
  install(Vue) {
    const localeObservable = (typeof Vue.observable === "function"
      ? Vue.observable
      : reactive)({
      locales: {
        fr: {
          date: "Date du calendrier",
          externalLink: "Lien externe",
          loading: "Chargement...",
          // currentPage: 'Page actuelle:',
          event: "Évènement",
          pastEvent: "Évènement terminé",
          search: "Rechercher",
          toggleBold: "Gras",
          toggleItalic: "Italique",
          toggleUnderline: "Souligner",
          toggleBlockquote: "Bloc de citation",
          toggleOrderedList: "Liste ordonnée",
          toggleBulletedList: "Liste à points",
          addImage: "Image",
          edit: "Modifier",
          choose: "Choisir",
          remove: "Supprimer",
          langpicker: "Choix de la langue",
          previousPage: "Page précédente",
          nextPage: "Page suivante",
          goToPage: "Aller à la page ",
          currentPage: "Actuellement sur la page ",
          secondaryNav: "Navigation secondaire",
          close: "Fermer",
          home: "Retour à la page d'accueil",
          openSidebar: "Ouvrir le menu latéral",
          discover: "Découvrir"
        },
        en: {
          date: "Calendar date",
          externalLink: "External link",
          loading: "Loading...",
          // currentPage: 'Current page:',
          event: "Event",
          pastEvent: "Past event",
          search: "Search",
          toggleBold: "Toggle bold",
          toggleItalic: "Toggle italic",
          toggleUnderline: "Toggle underline",
          toggleBlockquote: "Toggle blockquote",
          toggleOrderedList: "Toggle ordered list",
          toggleBulletedList: "Toggle bullet list",
          addImage: "Add image",
          edit: "Edit",
          choose: "Choose",
          remove: "Remove",
          langpicker: "Language picker",
          previousPage: "Previous page",
          nextPage: "Next page",
          goToPage: "Go to page ",
          currentPage: "Currently on page ",
          secondaryNav: "Secondary navigation",
          close: "Close",
          home: "Back to homepage",
          openSidebar: "Open sidebar",
          discover: "Discover"
        }
      },
      current: "fr"
    });
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
        }
      }
    });

    const addLocale = (name, locale) => {
      Vue.set(localeObservable.locales, name, locale);
    };
    const setLocale = locale => {
      localeObservable.current = locale;
    };
    if (Vue.provide && typeof Vue.provide === "function") {
      Vue.provide("$MKSaddLocale", addLocale);
      Vue.provide("$MKSsetLocale", setLocale);
    } else {
      Vue.prototype.$MKSaddLocale = addLocale;
      Vue.prototype.$MKSsetLocale = setLocale;
    }
  }
};
