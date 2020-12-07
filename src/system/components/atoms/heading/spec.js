import { shallowMount } from "@vue/test-utils";
import Comp from "./Heading.vue";

describe("Heading.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        tag: "h1",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets class with tagClass modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        tag: "h1",
        tagClass: "h2",
      },
    });
    expect(wrapper.classes()).toContain("heading--h2");
  });

  it("has a default color class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        tag: "h1",
      },
    });
    expect(wrapper.classes()).toContain("heading--text");
  });

  it("sets class with color modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        tag: "h1",
        color: "secondary",
      },
    });
    expect(wrapper.classes()).toContain("heading--secondary");
  });
});
