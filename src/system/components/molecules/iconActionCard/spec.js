import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./IconActionCard.vue";
import Button from "../../atoms/button/Button.vue";
import Icon from "../../atoms/icon/Icon.vue";

const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksIcon", Icon);

describe("IconActionCard.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets size small class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        sizeSmall: true
      },
    });
    expect(wrapper.classes()).toContain("card--size-small")
  });

  it("sets fixed border class", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        fixedBorder: true
      },
    });
    expect(wrapper.classes()).toContain("card--fixed-border")
  });

  it("makes card cliquable", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        actionLink: true
      },
    });
    expect(wrapper.element.tagName).toBe("ROUTER-LINK");
  });

  it("sets specified theme", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        theme: 'primary'
      },
    });
    expect(wrapper.classes()).toContain("card--theme-primary")
  });

  it("sets button label", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        buttonLabel: 'click'
      },
    });

    const button = wrapper.findComponent(Button);
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("click");
  });

  it("emits click event", async () => {
    const wrapper = shallowMount(Comp, {
        localVue,
        propsData: {
            buttonLabel: 'click'
        }
    });

    const button = wrapper.findComponent(Button);
    button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("displays icon", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        icon: 'clock'
      },
    });

    const icon = wrapper.findComponent(Icon);
    expect(icon.exists()).toBe(true);
  });

  it("displays image", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        image: 'https://via.placeholder.com/500'
      }
    });

    const div = wrapper.find('.card__image')
    expect(div.exists()).toBeTruthy();
  });

    // test prop roundedImage
    // test prop name
    // test prop descrption
    // test prop status
    // test prop statusType
    // test prophide button onmobile
    // test prop button type

  
});