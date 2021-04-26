import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./EventLineCard.vue";

import Button from "../../atoms/button/Button.vue";
import Tag from "../../atoms/tag/Tag.vue";
import VisuallyHidden from "../../atoms/visuallyHidden/VisuallyHidden.vue";

const $MKSlocale = { 
  event: 'Évènement',
  pastEvent: 'Évènement terminé',
};
const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksTag", Tag);
localVue.component("MksVisuallyHidden", VisuallyHidden);

describe("EventLineCard.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      data() {
        return {
          uniqueId: 'id-override'
        }
      },
      propsData: {
        link: "https://example.com/",
        date: "26/01/1986",
        duration: 30,
        title: "The title",
        metas: ["tag1", "tag2"],
        cover: "https://placeholder.com/",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("matches snapshot past version", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      data() {
        return {
          uniqueId: 'id-override'
        }
      },
      propsData: {
        link: "https://example.com/",
        date: new Date(new Date("26/01/1986").getTime()).toString(),
        duration: 60,
        title: "The title",
        cover: "https://placeholder.com/",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("emits click event", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        link: "https://example.com/",
        date: "26/01/1986",
        duration: 30,
        title: "The title",
        cover: "https://placeholder.com/",
      },
    });

    wrapper.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("displays now modifier", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        link: "https://example.com/",
        date: new Date(Date.now() - 1200).toString(),
        duration: 60,
        title: "The title",
        cover: "https://placeholder.com/",
      },
    });

    expect(wrapper.classes()).toContain("event--now");
  });

  it("displays past modifier", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        link: "https://example.com/",
        date: new Date(Date.now() - 10000000).toString(),
        duration: 60,
        title: "The title",
        cover: "https://placeholder.com/",
      },
    });

    expect(wrapper.classes()).toContain("event--past");
  });

  it("displays button label content", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        link: "https://example.com/",
        date: new Date(Date.now() - 1200).toString(),
        duration: 60,
        callToAction: "abc",
        title: "The title",
        cover: "https://placeholder.com/",
      },
    });

    const button = wrapper.findComponent(Button);
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("abc");
  });
});
