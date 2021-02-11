import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./BeanMenu.vue";
import HorizontalList from "../../layouts/horizontalList/HorizontalList.vue";
import Link from "../../atoms/link/Link.vue";

const localVue = createLocalVue();
localVue.component("MksHorizontalList", HorizontalList);
localVue.component("MksLink", Link);

describe("BeanMenu.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        links: [
          {
            label: "link 1",
            to: "https://example.com",
          },
          {
            label: "link 2",
            to: "https://example2.com",
          },
        ],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
