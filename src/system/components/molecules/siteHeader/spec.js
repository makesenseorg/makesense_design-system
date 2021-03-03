import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./SiteHeader.vue";
import Button from "../../atoms/button/Button.vue";
import Icon from "../../atoms/icon/Icon.vue";
import BeanMenu from "../../molecules/beanMenu/BeanMenu.vue";

const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksIcon", Icon);
localVue.component("MksBeanMenu", BeanMenu);

describe("SiteHeader.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets the translucent class", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        translucent: true
      }
    });
    expect(wrapper.classes()).toContain("site-header--translucent");
  });

  it("sets the fixed class", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        fixed: true
      }
    });
    expect(wrapper.classes()).toContain("site-header--fixed");
  });

  it("disables the sidebar", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        sidebar: false
      }
    });
    const sidebarControl = wrapper.find(".site-header__sidebar-control");
    expect(sidebarControl.exists()).toBeFalsy();
  });

  it("sets the logo", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        logo: "https://makesense.org/logo.png"
      }
    });
    const logoImg = wrapper.find(".site-header__logo img");
    expect(logoImg.attributes("src")).toBe("https://makesense.org/logo.png");
  });
});
