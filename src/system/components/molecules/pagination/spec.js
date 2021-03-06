import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./Pagination.vue";
import Button from "../../atoms/button/Button.vue";
import Icon from "../../atoms/icon/Icon.vue";
import VisuallyHidden from "../../atoms/VisuallyHidden/VisuallyHidden.vue";
import HorizontalList from "../../layouts/horizontalList/HorizontalList.vue";

const $MKSlocale = {
  previousPage: 'Previous page',
  nextPage: 'Next page',
  goToPage: 'Go to page ',
  currentPage: 'Currently on page ',
}
const localVue = createLocalVue();
localVue.component("MksButton", Button);
localVue.component("MksIcon", Icon);
localVue.component("MksHorizontalList", HorizontalList);
localVue.component("MksVisuallyHidden", VisuallyHidden);

describe("Pagination.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 10,
        value: 5
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("pads 1 pages by default", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 50
      }
    });
    wrapper.findAllComponents(VisuallyHidden).destroy();
    expect(wrapper.text().replace(/\s+/g, ",")).toBe(
      "1,...,49,50,51,...,100"
    );
  });

  it("pads pages according to the pad value", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 50,
        pad: 1
      }
    });
    wrapper.findAllComponents(VisuallyHidden).destroy();
    expect(wrapper.text().replace(/\s+/g, ",")).toBe(
      "1,...,49,50,51,...,100"
    );
  });

  it("pads the first/last pages according to the padEnd value", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 50,
        padEnd: 1
      }
    });
    wrapper.findAllComponents(VisuallyHidden).destroy();
    expect(wrapper.text().replace(/\s+/g, ",")).toBe(
      "1,2,...,49,50,51,...,99,100"
    );
  });

  it("pads the current page according to the padAround value", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 50,
        padAround: 2
      }
    });
    wrapper.findAllComponents(VisuallyHidden).destroy();
    expect(wrapper.text().replace(/\s+/g, ",")).toBe(
      "1,...,48,49,50,51,52,...,100"
    );
  });

  it("doesn't show an ellipsis for a single page", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 4,
        pad: 1
      }
    });
    wrapper.findAllComponents(VisuallyHidden).destroy();
    expect(wrapper.text().replace(/\s+/g, ",")).toBe("1,2,3,4,5,...,100");
  });

  it("goes to the previous page when clicked", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 5,
        pad: 1
      }
    });
    const button = wrapper.find(".pagination__button--prev");
    button.vm.$emit("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().change[0]).toEqual([4]);
  });

  it("goes to the next page when clicked", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 5,
        pad: 1
      }
    });
    const button = wrapper.find(".pagination__button--next");
    button.vm.$emit("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().change[0]).toEqual([6]);
  });

  it("goes to the selected page when clicked", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 5,
        pad: 1
      }
    });
    const button = wrapper.find(".pagination__item");
    button.vm.$emit("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().change[0]).toEqual([1]);
  });

  it("disables the 'previous' button on the first page", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 1,
        pad: 1
      }
    });
    const button = wrapper.find(".pagination__button--prev");
    expect(button.classes()).toContain("disabled");
  });

  it("disables the 'next' button on the last page", async () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      mocks: { $MKSlocale },
      propsData: {
        total: 100,
        value: 100,
        pad: 1
      }
    });
    const button = wrapper.find(".pagination__button--next");
    expect(button.classes()).toContain("disabled");
  });
});
