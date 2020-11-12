import { shallowMount } from "@vue/test-utils";
import Comp from "./Tab.vue";

describe("Tab.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        id: "test-id",
        title: "test-id",
        active: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets class with active modifier set as true", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        id: "test-id",
        title: "test-id",
        active: true,
      },
    });
    expect(wrapper.classes()).toContain("tab-button--active");
  });

  it("emit id on click", async () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        id: "test-id",
        title: "test-id",
        active: true,
      },
    });

    wrapper.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
