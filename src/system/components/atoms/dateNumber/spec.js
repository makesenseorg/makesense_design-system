/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import Comp from "./DateNumber.vue";

describe("DateNumber.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        number: 1234,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("has primary as default color class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        number: 1234,
      },
    });
    expect(wrapper.classes()).toContain("date--color-primary");
  });

  it("sets class with color modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        number: 1234,
        color: "secondary",
      },
    });
    expect(wrapper.classes()).toContain("date--color-secondary");
  });

  it("matches snapshot with slot", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        default: "<div>2000</div>",
      },
      propsData: {},
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
