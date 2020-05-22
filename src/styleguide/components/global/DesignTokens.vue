<template>
  <ds-space margin-top="x-large">
    <ds-flex gutter="large" :direction="{ lg: 'row-reverse' }">
      <ds-flex-item :width="{ base: '100%', lg: '250px' }">
        <div class="sticky">
          <mks-heading tag="h4">Categories</mks-heading>
          <ds-menu :routes="tokenMenu" />
        </div>
      </ds-flex-item>
      <ds-flex-item>
        <ds-space v-for="(group, key) in tokenMap" :key="key">
          <mks-heading tag="h3" :id="key">{{ key | startCase }}</mks-heading>
          <ds-table
            :data="group"
            :fields="{ token: { width: '300px' }, example: 'Example' }"
          >
            <template slot="token" slot-scope="data">
              <ds-copy-field>
                {{ data.row.scss }}
              </ds-copy-field>
              <ds-copy-field>
                tokens.{{ data.row.name | camelCase }}
              </ds-copy-field>
            </template>
            <template slot="example" slot-scope="data">
              <token-item :token="data.row" />
            </template>
          </ds-table>
        </ds-space>
      </ds-flex-item>
    </ds-flex>
  </ds-space>
</template>

<script>
import { tokenMap } from "@@/tokens";
import DsCopyField from "../data-display/CopyField/CopyField";
import DsTable from "../data-display/Table/Table";
import DsSpace from "../layout/Space/Space";
import DsHeading from "../typography/Heading/Heading";
import DsFlex from "../layout/Flex/Flex";
import DsFlexItem from "../layout/Flex/FlexItem";
import DsMenu from "../navigation/Menu/Menu";

export default {
  name: "DesignTokens",
  components: {
    DsCopyField,
    DsTable,
    DsSpace,
    DsHeading,
    DsFlex,
    DsFlexItem,
    DsMenu
  },
  computed: {
    tokenMap() {
      return tokenMap;
    },
    tokenMenu() {
      return Object.keys(this.tokenMap).map(key => {
        return {
          name: this.$options.filters.startCase(key),
          path: `#${key}`
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 50px;
}
</style>
