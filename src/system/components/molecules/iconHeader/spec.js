import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./IconHeader.vue";
import Heading from "../../atoms/heading/Heading.vue";

const localVue = createLocalVue();
localVue.component("MksHeading", Heading);

describe("IconHeader.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        image: "https://via.placeholder.com/500",
        alt: "Alt text",
        title: "Title",
        titleTag: "h1",
        description: "Description",
        descriptionType: "light",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("matches snapshot without description", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        image: "https://via.placeholder.com/500",
        alt: "Alt text",
        title: "Title",
        titleTag: "h1",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
