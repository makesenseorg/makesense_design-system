import { shallowMount } from "@vue/test-utils";
import Comp from "./Loading.vue";

describe("Loading.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {},
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("sets type modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        type: "full",
      },
    });
    expect(wrapper.classes()).toContain("loading--full");
  });

  it("sets inline modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        inline: true,
      },
    });
    expect(wrapper.classes()).toContain("loading--inline");
  });

  it("sets color modifier on svg icon", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        color: "#ffffff",
      },
    });
    expect(wrapper.find(".loading__svg").attributes("stroke")).toBe("#ffffff");
  });

  it("sets color modifier on svg icon circle", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        color: "#ffffff",
      },
    });
    expect(wrapper.find(".loading__svg circle").attributes("stroke")).toBe(
      "#ffffff"
    );
  });

  it("sets size width modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        size: 60,
      },
    });
    expect(wrapper.find(".loading__svg").attributes("width")).toBe("60");
  });

  it("sets size height modifier", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        size: 60,
      },
    });
    expect(wrapper.find(".loading__svg").attributes("height")).toBe("60");
  });

  it("display progress container", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        progress: 50,
      },
    });

    expect(wrapper.find(".loading__progress").exists()).toBe(true);
  });

  it("display progress number", () => {
    const wrapper = shallowMount(Comp, {
      propsData: {
        progress: 50,
      },
    });

    expect(wrapper.find(".loading__progress").text()).toBe("50%");
  });
});
