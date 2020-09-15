## 1. Add as a dependency

```
npm i @makesenseorg/design-system
```

or

```
 npm i @makesenseorg/design-system
```

## 2. Import in app

In a Vue app, this goes in the app entry file (usually index.js or main.js)

```
import DesignSystem from '@makesenseorg/design-system'
import '@makesenseorg/design-system/dist/system.css'

Vue.use(DesignSystem);
...
```

## 3. Load theme

Just below, load the app theme, to get all the colors related to your app. The theme needs to exist in the design system. (list of available themes in `./src/tokens/themes`)
The default name is `base`.

```
...
Vue.prototype.$loadTheme('base')
```

You can also change the theme using `this.$loadTheme(theme_name)` inside a view or a component.

## 4. Use scss variables and mixins

In order to have access to the design system variables and mixins, you need to import the `shared.scss` file either locally in each component, or once globally in the app.

```
// locally inside component.vue
<style lang="scss">
    @import "@makesenseorg/design-system/dist/shared.scss";
</style>
```

```
// globally inside vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@makesenseorg/design-system/dist/shared.scss";`,
      },
    },
  },
};

```
