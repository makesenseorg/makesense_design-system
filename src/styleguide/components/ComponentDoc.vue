<template>
  <div>
    <ds-page-title :heading="component.name | componentName" />
    <ds-container class="container">
      <mks-spacer>
        <mks-spacer v-if="component.tags" inline>
          <template v-for="(tagGroup, name) in component.tags">
            <mks-tag
              v-for="(tag, index) in tagGroup"
              :color="tagColor(tag)"
              :key="`${name}${index}`"
            >
              {{ tagDescription(tag) }} </mks-tag
            >&nbsp;
          </template>
        </mks-spacer>
        <mks-text size="large">{{ component.description }}</mks-text>
      </mks-spacer>
      <br />
      <ds-space
        v-for="(part, index) in docParts"
        margin-bottom="xxl"
        :key="index"
      >
        <ds-space>
          <markdown :content="part.description" />
        </ds-space>
        <code-example :code="part.example" v-if="part.example" />
      </ds-space>
      <ds-space margin-bottom="xxl">
        <component-options-doc :component="component" />
      </ds-space>
      <ds-space
        margin-bottom="xxl"
        v-if="component.children"
        v-for="child in component.children"
        :key="child.name"
      >
        <component-options-doc :component="child" />
      </ds-space>
    </ds-container>
  </div>
</template>

<script>
import CodeExample from "./CodeExample";
import ComponentOptionsDoc from "./ComponentOptionsDoc";
import DsPageTitle from "./layout/PageTitle/PageTitle";
import DsContainer from "./layout/Container/Container";
import DsSpace from "./layout/Space/Space";
import DsText from "./typography/Text/Text";
import DsTag from "./typography/Tag/Tag";
import DsHeading from "./typography/Heading/Heading";

export default {
  name: "ComponentDoc",
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  components: {
    CodeExample,
    ComponentOptionsDoc,
    DsPageTitle,
    DsContainer,
    DsSpace,
    DsText,
    DsHeading,
    DsTag
  },
  data() {
    return {
      propFields: {
        name: {
          label: "Prop Name",
          width: "20%"
        },
        type: {
          label: "Type",
          width: "20%"
        },
        default: {
          label: "Default",
          width: "20%"
        },
        description: "Description"
      }
    };
  },
  computed: {
    componentProps() {
      return Object.keys(this.component.props).map(name => {
        return {
          name,
          ...this.component.props[name]
        };
      });
    },
    componentSlots() {
      return Object.keys(this.component.slots).map(name => {
        return {
          name,
          ...this.component.slots[name]
        };
      });
    },
    docParts() {
      const component = this.component.component;
      if (!component.__docs) {
        return [];
      }
      const parts = component.__docs.split("```");
      let i = 0;
      const parsed = parts.reduce((result, part, index) => {
        if (index % 2 === 0) {
          result[i] = {
            description: part
          };
        } else {
          result[i].example = part;
          i++;
        }
        return result;
      }, []);
      return parsed;
    }
  },
  methods: {
    tagColor(tag) {
      if (tag.title === "deprecated") {
        return "warning";
      }
      if (tag.title === "see") {
        return "primary";
      }
      return "neutral";
    },
    tagDescription(tag) {
      if (tag.description === true) {
        return tag.title;
      }
      if (tag.title === "see") {
        return `Child of ${tag.description}`;
      }
      return `${tag.title} ${tag.description}`;
    }
  }
};
</script>

<style lang="scss">
.container {
  padding-top: $space-l;
  padding-bottom: $space-xxl;
}
h2.heading {
  margin-top: $space-xxl;
}
h3.heading {
  margin-top: $space-xl;
}
.heading {
  margin-top: $space-l;
  margin-bottom: $space-s;
}
</style>
