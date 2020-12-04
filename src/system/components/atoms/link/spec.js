import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./Link.vue";

describe("Link.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
        propsData: {
          to: "http://google.com"
        },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets wrapper tag to a if link is external", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        to: "http://google.com",
      },
    });
    expect(wrapper.element.tagName).toBe("A");
  });

  it("sets wrapper tag to router-link if link is internal in VUE", () => {
    const wrapper = shallowMount(Comp, {
      stubs: ['router-link'],
      propsData: {
        to: "/home",
      },
    });
    expect(wrapper.element.tagName).toBe("ROUTER-LINK-STUB");
  });

  it("sets wrapper tag to nuxt-link if link is internal in NUXT", () => {
    const wrapper = shallowMount(Comp, {
      mocks: {
        $nuxt: true
      },
      stubs: ['nuxt-link'],
      propsData: {
        to: "/home",
      },
    });
    expect(wrapper.element.tagName).toBe("NUXT-LINK-STUB");
  });


  it("sets class with menu modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: "menu",
        to: "http://google.com",
      },
    });
    expect(wrapper.classes()).toContain("link--menu");
  });

  it("sets target blank if link is external", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        to: "http://google.com",
      },
    });
    expect(wrapper.attributes('target')).toBe("_blank");
  });

  // test slot
  it("displays slot content", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        to: "http://google.com",
      },
      slots: {
        default: "clickme",
      },
    });

    expect(wrapper.text()).toBe("clickme");
  });  
});