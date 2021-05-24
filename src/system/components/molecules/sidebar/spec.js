import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./Sidebar.vue";
import Button from "../../atoms/button/Button.vue";
import Icon from "../../atoms/icon/Icon.vue";

const $MKSlocale = {
  secondaryNav: "Secondary navigation",
  close: "Close",
};
const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksIcon", Icon);

describe("Sidebar.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, { localVue, mocks: { $MKSlocale } });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("opens", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        open: true,
      },
    });
    expect(wrapper.classes()).toContain("sidebar--opened");
  });

  it("displays default slot content", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      slots: {
        default: "abc",
      },
    });

    const div = wrapper.find(".sidebar__main-content");
    expect(div.text()).toBe("abc");
  });

  it("emits click event", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      props: {
        open: true,
      },
    });

    const button = wrapper.find(".sidebar__close-layer");
    expect(button.exists()).toBe(true);

    button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("closed")).toBeTruthy();
  });
});
