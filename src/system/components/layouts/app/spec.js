import { shallowMount } from "@vue/test-utils";
import Comp from "./App.vue";

describe("App.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("displays slots content", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        aside: "aside",
        default: "content",
        top: "top",
        bottom: "bottom",
      },
    });

    expect(wrapper.text()).toContain("aside");
    expect(wrapper.text()).toContain("content");
    expect(wrapper.text()).toContain("top");
    expect(wrapper.text()).toContain("bottom");
  });
});
