import { shallowMount } from "@vue/test-utils";
import Comp from "./Separator.vue";

describe("Separator.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {},
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
