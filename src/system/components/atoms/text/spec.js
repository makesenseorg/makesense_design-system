import { shallowMount } from "@vue/test-utils";
import Comp from "./Text.vue";

describe("Text.vue", () => {
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

  it("has a default tag of span", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element.tagName).toBe("SPAN");
  });

  it("sets other tags if specified", () => {
    const wrapper = shallowMount(Comp, {
        propsData: {
            tag: "p",
        },
    });
    expect(wrapper.element.tagName).toBe("P");
  });

  it("sets class with color modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        color: "secondary",
      },
    });
    expect(wrapper.classes()).toContain("text--color-secondary");
  });

  it("sets class with size modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        size: "small",
      },
    });
    expect(wrapper.classes()).toContain("text--size-small");
  });

  it("sets class with weight modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        weight: "bold",
      },
    });
    expect(wrapper.classes()).toContain("text--weight-bold");
  });

  it("sets class with align modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        align: "center",
      },
    });
    expect(wrapper.classes()).toContain("text--align-center");
  });
});
