import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./LangPicker.vue";

import Button from "../../atoms/button/Button.vue";

const localVue = createLocalVue();
localVue.component("MksButton", Button);

describe("langPicker.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        langs: ["French", "English"],
        active: "French",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("emits select lang event", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        langs: ["French", "English"],
        active: "French",
      },
    });

    const button = wrapper.find(".app-lang__button--active");
    expect(button.exists()).toBe(true);

    button.vm.$emit("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("select")).toBeTruthy();
  });

  it("displays active lang modifier", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        langs: ["French", "English"],
        active: "French",
      },
    });

    const button = wrapper.find(".app-lang__button--active");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("French");
  });
});
