import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./Sidebar.vue";
import Button from "../../atoms/button/Button.vue";
import Icon from "../../atoms/icon/Icon.vue";

const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksIcon", Icon);

describe("Sidebar.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {localVue});
    expect(wrapper.element).toMatchSnapshot();
  });

  it("opens", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        open: true
      },
    });
    expect(wrapper.classes()).toContain("sidebar--opened")
  });

  it("displays header slot content", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      slots: {
        header: "abc",
      },
    });

    const div = wrapper.find('.sidebar__header')
    expect(div.text()).toBe("abc");
  });

  it("displays default slot content", () => {
    const wrapper = shallowMount(Comp, {
        localVue,
        slots: {
            default: "abc",
        },
    });

    const div = wrapper.find('.sidebar__main-content')
    expect(div.text()).toBe("abc");
  });

  it("emits click event", async () => {
    const wrapper = shallowMount(Comp, {
        localVue,
        props: {
            open: true
        }
    });

    const button = wrapper.find('.sidebar__close-layer');
    expect(button.exists()).toBe(true);

    button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('close')).toBeTruthy();
  });

});