import { shallowMount } from "@vue/test-utils";
import Comp from "./Icon.vue";

describe("Icon.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: 'clock'
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("displays the icon", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: 'clock'
      }
    });

    expect(wrapper.element.innerHTML).not.toBeUndefined();
  });

  it("uses shortcut for old font awesome names", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: 'arrowDown'
      }
    });
    expect(wrapper.classes()).toContain("icon-arrow-down");
  });

  it("sets the color class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: 'clock',
        color: "primary",
      },
    });
    expect(wrapper.classes()).toContain("icon--color-primary");
  });

  it("throws on invalid color", () => {
    const color = Comp.props.color;
    expect(color.validator).toBeInstanceOf(Function);
    expect(color.validator("primary")).toBeTruthy();
    expect(color.validator("red")).toBeFalsy();
  });

  it("sets the size", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: 'clock',
        size: "50",
      },
    });

    expect(wrapper.attributes('width')).toBe("50");
    expect(wrapper.attributes('height')).toBe("50");
    
  });

  it("sets the stroke width", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: 'clock',
        strokeWidth: "5",
      },
    });

    expect(wrapper.attributes('stroke-width')).toBe("5");
    
  });

  
});