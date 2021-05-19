import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Comp from "./SiteHeader.vue";
import Button from "../../atoms/button/Button.vue";
import Icon from "../../atoms/icon/Icon.vue";
import Link from "../../atoms/link/Link.vue";
import Navigation from "../../molecules/navigation/Navigation.vue";

const $MKSlocale = {
  home: 'Retour à la page d\'accueil',
  openSidebar: 'Ouvrir le menu latéral'
}
const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksIcon", Icon);
localVue.component("MksLink", Link);
localVue.component("MksNavigation", Navigation);

describe("SiteHeader.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      stubs: ['router-link'],
      mocks: { $MKSlocale },
      propsData: {
        menuLinks: []
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets the fixed class", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      stubs: ['router-link'],
      mocks: { $MKSlocale },
      propsData: {
        fixed: true,
        menuLinks: []
      }
    });
    expect(wrapper.classes()).toContain("site-header--fixed");
  });

  it("disables the sidebar", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      stubs: ['router-link'],
      mocks: { $MKSlocale },
      propsData: {
        sidebar: false,
        menuLinks: []
      }
    });
    const sidebarControl = wrapper.find(".site-header__sidebar-control");
    expect(sidebarControl.exists()).toBeFalsy();
  });

  it("sets the logo", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      stubs: ['router-link'],
      mocks: { $MKSlocale },
      propsData: {
        logo: "https://makesense.org/logo.png",
        menuLinks: []
      }
    });
    const logoImg = wrapper.find(".site-header__logo img");
    expect(logoImg.attributes("src")).toBe("https://makesense.org/logo.png");
  });
});
