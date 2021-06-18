import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./Hero.vue";
import Heading from "../../atoms/heading/Heading.vue";
import Separator from "../../atoms/separator/Separator.vue";

const localVue = createLocalVue();
localVue.component("MksHeading", Heading);
localVue.component("MksSeparator", Separator);

describe("Hero.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        uptitle: "Hello",
        title: "World",
        titleTag: "h3",
        beans: 2,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets specified theme", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        theme: "primary",
      },
    });
    expect(wrapper.classes()).toContain("hero--theme-primary");
  });

  it("displays title", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        title: "bonjour",
      },
    });
    const title = wrapper.findComponent(Heading);
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("bonjour");
  });

  it("sets title tag", () => {
    const wrapper = mount(Comp, {
      localVue,
      propsData: {
        titleTag: "h3",
        title: "bonjour",
      },
    });
    const title = wrapper.findComponent(Heading);
    expect(title.element.tagName).toBe("H3");
  });

  it("displays uptitle", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        uptitle: "abc",
      },
    });

    const div = wrapper.find(".content__uptitle");
    expect(div.text()).toBe("abc");
  });

  it("displays slot content", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      slots: {
        default: "abc",
      },
    });

    const div = wrapper.find(".content__text");
    expect(div.text()).toBe("abc");
  });
});
