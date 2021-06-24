import { shallowMount } from "@vue/test-utils";
import Comp from "./Spacer.vue";

describe("Spacer.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("displays slots", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        default: '<p>a</p><p>b</p>',
      },
    });

    expect(wrapper.text()).toContain("ab");
  });

  it("displays elements inline", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        inline: true,
      },
    });

    expect(wrapper.classes()).toContain("spacer--inline");
  });
});
