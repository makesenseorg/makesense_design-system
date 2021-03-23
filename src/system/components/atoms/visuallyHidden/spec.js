import { shallowMount } from "@vue/test-utils";
import Comp from "./VisuallyHidden.vue";

describe("VisuallyHidden.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        default: "Lorem ipsum dolor sit amet",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("display content in slot", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        default: "Lorem ipsum dolor sit amet",
      },
    });
    expect(wrapper.text()).toBe("Lorem ipsum dolor sit amet");
  });
});
