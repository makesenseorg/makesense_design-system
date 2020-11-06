import { mount } from "@vue/test-utils";
import Comp from "./FieldLabel.vue";
import MksIcon from "@@/components/atoms/icon/Icon.vue";

describe("FieldLabel.vue", () => {
  it("matches snapshot", () => {
    const wrapper = mount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets class with light modifier", () => {
    const wrapper = mount(Comp, {
      propsData: {
        light: true,
      },
    });
    expect(wrapper.classes()).toContain("field-label--light");
  });

  it("sets for attribute", () => {
    const wrapper = mount(Comp, {
      propsData: {
        targetName: "input",
      },
    });

    expect(wrapper.attributes("for")).toBe("input");
  });

  it("displays default slot content", () => {
    const wrapper = mount(Comp, {
      slots: {
        default: "content",
      },
    });

    expect(wrapper.text()).toBe("content");
  });

  it("emits click on click", async () => {
    const wrapper = mount(Comp);
    wrapper.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
