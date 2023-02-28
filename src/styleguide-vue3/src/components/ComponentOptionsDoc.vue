<template>
  <div>
    <ds-space v-if="componentProps">
      <mks-heading tag="h2"
        >{{ $filters.componentName(component.displayName) }} Props</mks-heading
      >
      <ds-card>
        <ds-table :data="componentProps" :fields="propFields">
          <template v-slot:name="{ row }">
            <mks-spacer spacing="xs">
              <ds-code inline>
                {{ $filters.kebabCase(row.name) }}
              </ds-code>
              <div v-if="row.required">
                <mks-tag v-if="row.required" color="warning">required</mks-tag>
              </div>
              <ds-space :margin-bottom="null" margin-top="s">
                <div v-if="row.options">
                  <mks-tag
                    size="small"
                    v-for="option in row.options"
                    :key="option"
                  >
                    {{ option }}
                  </mks-tag>
                </div>
                <mks-text size="small" color="light">{{
                  row.description
                }}</mks-text>
              </ds-space>
            </mks-spacer>
          </template>
          <template v-slot:type="{ row }">
            <mks-tag v-for="type in row.types" :key="type" inline>
              {{ type }}
            </mks-tag>
          </template>
          <template v-slot:default="{ row }">
            <mks-tag v-if="row.defaultValue" color="primary">
              <template v-if="row.default">
                {{ row.default }}
              </template>
              <template v-else-if="row.defaultValue.func">
                Function()
              </template>
              <template v-else>
                {{ row.defaultValue.value }}
              </template>
            </mks-tag>
          </template>
        </ds-table>
      </ds-card>
    </ds-space>
    <ds-space v-if="componentSlots && componentSlots.length">
      <mks-heading tag="h2"
        >{{ $filters.componentName(component.displayName) }} Slots</mks-heading
      >
      <ds-card>
        <ds-table :data="componentSlots" :fields="slotFields">
          <template v-slot:name="{ row }">
            <ds-code inline>
              {{ row.name }}
            </ds-code>
          </template>
          <template v-slot:description="{ row }">
            <mks-text size="small" color="light">
              {{ row.description }}
            </mks-text>
          </template>
        </ds-table>
      </ds-card>
    </ds-space>
    <ds-space v-if="componentEvents && componentEvents.length">
      <mks-heading tag="h2"
        >{{ $filters.componentName(component.displayName) }} Events</mks-heading
      >
      <ds-card>
        <ds-table :data="componentEvents" :fields="eventFields">
          <template v-slot:name="{ row }">
            <ds-code inline> @{{ row.name }} </ds-code>
          </template>
          <template v-slot:description="{ row }">
            <mks-text size="small" color="light">
              {{ row.description }}
            </mks-text>
          </template>
        </ds-table>
      </ds-card>
    </ds-space>
  </div>
</template>

<script>
import DsTable from "./data-display/Table/Table";
import DsSpace from "./layout/Space/Space";
import DsCode from "./typography/Code/Code";
import DsCard from "./layout/Card/Card";

export default {
  name: "ComponentOptionsDoc",
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  components: {
    DsTable,
    DsSpace,
    DsCode,
    DsCard,
  },
  data() {
    return {
      propFields: {
        name: {
          label: "Name",
        },
        type: {
          label: "Type",
          width: "20%",
        },
        default: {
          label: "Default",
          width: "20%",
        },
      },
      slotFields: {
        name: {
          label: "Name",
          width: "20%",
        },
        description: "Description",
      },
      eventFields: {
        name: {
          label: "Name",
          width: "20%",
        },
        description: "Description",
      },
    };
  },
  computed: {
    componentProps() {
      if (!this.component.props) {
        return null;
      }
      return Object.keys(this.component.props)
        .map((name) => {
          return this.getPropAttributes(name, this.component.props[name]);
        })
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    },
    componentSlots() {
      if (!this.component.slots) {
        return null;
      }
      return Object.keys(this.component.slots)
        .map((name) => {
          return {
            name: (name.match(/[^/"\\]+/g) || []).join(""),
            ...this.component.slots[name],
          };
        })
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    },
    componentEvents() {
      if (!this.component.events) {
        return null;
      }
      return Object.keys(this.component.events)
        .map((name) => {
          return {
            name,
            ...this.component.events[name],
          };
        })
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    },
  },
  methods: {
    getPropAttributes(name, oldAttributes) {
      const attributes = {
        name,
        ...oldAttributes,
        ...this.getAttributesFromComment(oldAttributes.comment),
      };
      if (attributes.type && attributes.type.name) {
        attributes.types = attributes.type.name.split("|");
      }
      return attributes;
    },
    getAttributesFromComment(comment) {
      const attributes = {};
      if (comment) {
        const optionsMatch = comment.match(/@options[ ]+(\S[ \S]*)\n/);
        if (optionsMatch) {
          attributes.options = optionsMatch[1].split("|");
        }
        const defaultMatch = comment.match(/@default[ ]+(\S[ \S]*)\n/);
        if (defaultMatch) {
          attributes.default = defaultMatch[1];
        }
      }
      return attributes;
    },
  },
};
</script>

<style lang="scss"></style>
