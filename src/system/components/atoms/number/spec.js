import { shallowMount } from "@vue/test-utils";
import Comp from "./Number.vue";

describe("Number.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("matches snapshot with slot value number", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        value: "2000",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("matches snapshot with slots", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        value: "2000",
        label: "Visitors",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets color modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        color: "primary",
      },
    });

    expect(wrapper.classes()).toContain("number--color-primary");
  });
});
