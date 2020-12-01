import { shallowMount, createLocalVue } from "@vue/test-utils";
import Comp from "./Button.vue";
import Loading from "../loading/Loading.vue";

const localVue = createLocalVue();
localVue.component("MksLoading", Loading);


const mutationObserverMock = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
    // Optionally add a trigger() method to manually trigger a change
    this.trigger = (mockedMutationsList) => {
        callback(mockedMutationsList, this);
    };
});
global.MutationObserver = mutationObserverMock;

describe("Button.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("emits click event", async () => {
    const wrapper = shallowMount(Comp);

    wrapper.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("sets wrapper tag", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        tag: "a",
      },
    });
    expect(wrapper.element.tagName).toBe("A");
  });

  it("has loading style", () => {
    const wrapper = shallowMount(Comp, {
      localVue,
      propsData: {
        loading: true,
      },
    });
    const loading = wrapper.findComponent(Loading);
    expect(loading.exists()).toBe(true);
    expect(wrapper.classes()).toContain("button--loading");
  });

  // test type
  it("type primary by default", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.classes()).toContain("button--type-primary");
  });

  it("sets class with type modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: "secondary",
      },
    });
    expect(wrapper.classes()).toContain("button--type-secondary");
  });

  // test size
  it("sets size default by default", () => {
    const wrapper = shallowMount(Comp);
    expect(wrapper.classes()).toContain("button--size-default");
  });

  it("sets class with size modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        size: "small",
      },
    });
    expect(wrapper.classes()).toContain("button--size-small");
  });

  // test inputType
  it("sets input type attribute", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        inputType: "submit",
      },
    });
    expect(wrapper.attributes('type')).toBe("submit");
  });

  // test slot
  it("displays slot content", () => {
    const wrapper = shallowMount(Comp, {
      slots: {
        default: "clickme",
      },
    });

    expect(wrapper.text()).toBe("clickme");
  });


  // test minwidth

  
});