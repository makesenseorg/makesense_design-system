import { shallowMount } from "@vue/test-utils";
import Comp from "./Alert.vue";

describe("FieldLabel.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  // it displays slots

  // it emits click

  // it displays icon
});
