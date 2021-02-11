import {createLocalVue, shallowMount} from "@vue/test-utils";
import Comp from "./Tag.vue";
import Icon from "../icon/Icon.vue";

const localVue = createLocalVue();
localVue.component("MksIcon", Icon);

describe("Tag.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        label: "My Label"
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("matches snapshot without label", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("matches snapshot with an icon", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        label: "My Label",
        icon: "x"
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("truncates the label by default", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        label: "My very long label that should be truncated"
      }
    });
    expect(wrapper.text()).toBe("My very long label that should...");
  });

  it("keeps the label if trunc is false", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        label: "My very long label that should not be truncated",
        trunc: false
      }
    });
    expect(wrapper.text()).toBe(
      "My very long label that should not be truncated"
    );
  });

  it("has neutral as default color class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        label: "My Label"
      }
    });
    expect(wrapper.classes()).toContain("tag--color-neutral");
  });

  it("sets the color class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        label: "My Label",
        color: "primary"
      }
    });
    expect(wrapper.classes()).toContain("tag--color-primary");
  });

  it("throws on invalid color", () => {
    const color = Comp.props.color;
    expect(color.validator).toBeInstanceOf(Function);
    expect(color.validator("primary")).toBeTruthy();
    expect(color.validator("red")).toBeFalsy();
  });

  it("has medium as default size class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        label: "My Label"
      }
    });
    expect(wrapper.classes()).toContain("tag--size-medium");
  });

  it("sets the size class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        label: "My Label",
        size: "small"
      }
    });
    expect(wrapper.classes()).toContain("tag--size-small");
  });

  it("throws on invalid size", () => {
    const size = Comp.props.size;
    expect(size.validator).toBeInstanceOf(Function);
    expect(size.validator("small")).toBeTruthy();
    expect(size.validator("petit")).toBeFalsy();
  });

  it("is not-cliquable as default", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.classes()).toContain("tag--not-cliquable");
  });

  it("sets the cliquable class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        cliquable: true
      }
    });
    expect(wrapper.classes()).toContain("tag--cliquable");
  });

  it("emits click event", async () => {
    const wrapper = shallowMount(Comp);

    wrapper.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("throws on invalid icon", () => {
    const icon = Comp.props.icon;
    expect(icon.validator).toBeInstanceOf(Function);
    expect(icon.validator("x")).toBeTruthy();
    expect(icon.validator("menu")).toBeFalsy();
  });
});
