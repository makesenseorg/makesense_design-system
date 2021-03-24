import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./Card.vue";
import Button from "../../atoms/button/Button.vue";

const localVue = createLocalVue();
localVue.component("MksButton", Button);

describe("Card.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      data() {
        return {
          uniqueId: 'id-override'
        }
      },
        propsData: {
            image: 'https://placeholder.com/'
        }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("emits click event", async () => {
    const wrapper = shallowMount(Comp, {
        propsData: {
            image: 'https://placeholder.com/'
        }
    });

    wrapper.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("sets wrapper tag", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        tag: "a",
        image: 'https://placeholder.com/'
      },
    });
    expect(wrapper.element.tagName).toBe("A");
  });

  it("has call to action", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        callToAction: "Envoyer",
        image: 'https://placeholder.com/'
      },
    });
    const button = wrapper.findComponent(Button);
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Envoyer");
  });

  it("displays subtitle type modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        image: 'https://placeholder.com/',
        subtitle: 'subtitle',
        subtitleType: 'light'
      }
    });

    const div = wrapper.find('.card__subtitle')
    expect(div.classes()).toContain("card__subtitle--light")
  });


  it("displays title slot content", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        title: "abc",
      },
      propsData: {
        image: 'https://placeholder.com/'
      }
    });

    const div = wrapper.find('.card__title')
    expect(div.text()).toBe("abc");
  });

  it("displays title meta slot content", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        'title-meta': "abc",
      },
      propsData: {
        image: 'https://placeholder.com/'
      }
    });

    const div = wrapper.find('.card__title-wrapper')
    expect(div.text()).toContain("abc");
  });

  it("displays description slot content", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        description: "abc",
      },
      propsData: {
        image: 'https://placeholder.com/'
      }
    });

    const div = wrapper.find('.card__description')
    expect(div.text()).toBe("abc");
  });


  // test minwidth

  
});