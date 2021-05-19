import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./IconActionCard.vue";
import Button from "../../atoms/button/Button.vue";
import Icon from "../../atoms/icon/Icon.vue";

const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksIcon", Icon);

const $MKSlocale = { loading: 'loading' };

describe("IconActionCard.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      data() {
        return {
          uniqueId: 'id-override'
        }
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets size small class", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        sizeSmall: true
      },
    });
    expect(wrapper.classes()).toContain("card--size-small")
  });

  it("sets fixed border class", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        fixedBorder: true
      },
    });
    expect(wrapper.classes()).toContain("card--fixed-border")
  });

  it("makes card cliquable", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        actionLink: {name: "home"}
      },
      stubs: ['router-link']
    });
    expect(wrapper.element.tagName).toBe("ROUTER-LINK-STUB");
  });

  it("sets specified theme", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        theme: 'primary'
      },
    });
    expect(wrapper.classes()).toContain("card--theme-primary")
  });

  it("sets button label", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
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
      mocks: { $MKSlocale },
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
      mocks: { $MKSlocale },
      propsData: {
        icon: 'clock'
      },
    });

    const icon = wrapper.findComponent(Icon);
    expect(icon.exists()).toBe(true);
  });

  it("displays image", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        image: 'https://via.placeholder.com/500'
      }
    });

    const div = wrapper.find('.card__image')
    expect(div.exists()).toBeTruthy();
  });

  it("displays name", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        name: '<strong>Bonjour</strong>'
      }
    });

    const div = wrapper.find('.card__name')
    expect(div.text()).toBe("Bonjour");
  });

  it("displays description", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        description: 'Bonjour'
      }
    });

    const div = wrapper.find('.card__description')
    expect(div.text()).toBe("Bonjour");
  });

  it("displays status", () => {
    const wrapper = shallowMount(Comp, {
      mocks: { $MKSlocale },
      propsData: {
        status: 'Bonjour'
      }
    });

    const div = wrapper.find('.card__status')
    expect(div.text()).toBe("Bonjour");
  });
});