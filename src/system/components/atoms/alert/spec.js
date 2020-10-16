import { shallowMount } from "@vue/test-utils";
import Comp from "./Alert.vue";

describe("Alert.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets class with type modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: "positive",
      },
    });
    expect(wrapper.classes()).toContain("alert--positive");
  });
});
