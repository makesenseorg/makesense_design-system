<template>
  <div>
    <ds-page-title :heading="section.name" />
    <ds-container>
      <ds-space margin-top="x-large">
        <markdown
          :content="description"
          :components="requiredComponents"
          v-if="description"
        />
      </ds-space>
      <table cellpadding="0" cellspacing="0" class="ds-table">
        <tbody>
          <component-item
            v-if="components"
            v-for="component in components"
            :key="component.name"
            :component="component"
          />
        </tbody>
      </table>
    </ds-container>
  </div>
</template>

<script>
import ComponentItem from "./ComponentItem";
import DsPageTitle from "./layout/PageTitle/PageTitle";
import DsContainer from "./layout/Container/Container";
import DsSpace from "./layout/Space/Space";

export default {
  name: "SectionPage",
  props: {
    section: {
      type: Object,
      required: true
    },
    components: {
      type: Array,
      default: null
    }
  },
  components: {
    ComponentItem,
    DsContainer,
    DsPageTitle,
    DsSpace
  },
  data() {
    return {
      description: null,
      requiredComponents: {}
    };
  },
  created() {
    const name = this.section.name.replace(" ", "");

    if (this.section.requiredComponents) {
      this.section.requiredComponents.forEach(component => {
        try {
          const cFile = require(`./${component}`).default;
          this.requiredComponents[cFile.name] = cFile;
        } catch (err) {
          // eslint-disable-next-line
          console.error("could not get required component", err);
        }
      });
    }

    try {
      const mdFile = require(`!raw-loader?modules!../docs/${name}.md`);
      this.description = mdFile;
    } catch (err) {
      this.description = null;
    }
  },
  computed: {
    componentsData() {
      return this.components.map(component => {
        return {
          name: component.name,
          description: component.description,
          props: component.props ? Object.keys(component.props).join(", ") : "",
          link: component.name
        };
      });
    }
  }
};
</script>
