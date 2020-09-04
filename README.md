# Makesense design system

The makesense design system is build to make makesense design guidelines and Vue component available accross our multiple web applications.

Living styleguide demo: https://makesense-design-system.netlify.com

## Using the design system in a Nuxt app

### 1. Add as a dependency

```
yarn add @makesenseorg/design-system
// or
npm i @makesenseorg/design-system
```

### 2. Create a plugin

Add the plugin in `nuxt.config.js`.

```
plugins: ["~/plugins/design-system"],
```

Create the file `design-system.js` in `plugins` folder.

```
import Vue from 'vue'
import DesignSystem from '@makesenseorg/design-system'
import '@makesenseorg/design-system/dist/system.css'

Vue.use(DesignSystem);
...
```

### 3. Load theme

Just below, load the app theme, to get all the colors related to your app. The theme needs to exist in the design system. (list of available themes in `./src/tokens/themes`)
The default name is `base`.

```
...
if (process.client) {
  Vue.prototype.$loadTheme('base')
}
```

You can also change the theme using `this.$loadTheme(theme_name)` inside a view or a component.

**Warning !**
It is important to only use `loadTheme` on the client side, as it would throw a `document is not defined` error on the server side.

### 4. Use scss variables and mixins

In order to have access to the design system variables and mixins, you need to import the `shared.scss` file either locally in each component, or once globally in the app.

```
// locally inside component.vue
<style lang="scss">
    @import "@makesenseorg/design-system/dist/shared.scss";
</style>
```

In order to load the styles globally, you need to install style resources module

```
npm install --save-dev @nuxtjs/style-resources
```

In `nuxt.config.js`, register the module and add the style files

```jsx
modules: [
    '@nuxtjs/style-resources',
]
styleResources: {
    scss: [
      "@makesenseorg/design-system/dist/shared.scss",
    ],
  },
```

You're done! You can now use the components, mixins, scss variables.

## Using the design system in a Vue app

### 1. Add as a dependency

```
yarn add @makesenseorg/design-system
// or
npm i @makesenseorg/design-system
```

### 2. Import in app

In a Vue app, this goes in the app entry file (usually index.js or main.js)

```
import DesignSystem from '@makesenseorg/design-system'
import '@makesenseorg/design-system/dist/system.css'

Vue.use(DesignSystem);
...
```

### 3. Load theme

Just below, load the app theme, to get all the colors related to your app. The theme needs to exist in the design system. (list of available themes in `./src/tokens/themes`)
The default name is `base`.

```
...
Vue.prototype.$loadTheme('base')
```

You can also change the theme using `this.$loadTheme(theme_name)` inside a view or a component.

### 4. Use scss variables and mixins

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

You're done! You can now use the components, mixins, scss variables.

## Contributing

```
yarn install
```

### Developing

Compiles and hot-reloads living styleguide

```
yarn dev
```

### Building

#### Living styleguide

Compiles living styleguide to `./docs`

```
yarn build
```

#### Library

Compiles design system as a library to `./dist`

```
yarn build:lib
```

### Helper

#### Serve living styleguide locally

for example to develop on another application with a newer version of the styleguide

```
yarn serve
```

#### Lints and fixes files

```
yarn lint
```

### Publishing

The repo is automatically publish when the version is updated and pushed to master.

## Semantic versioning rules

| Code status | Stage | Rule | Example version |
| First release | New product | Start with 1.0.0 | 1.0.0 |
| Backward compatible bug fixes | Patch release | Increment the third digit | 1.0.1 |
| Backward compatible new features | Minor release | Increment the middle digit and reset last digit to zero | 1.1.0 |
| Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0 |

## Thanks

Thanks to CION design system for providing the design system boilerplate.

## License

[MIT License](./LICENSE) - Copyright (c) Makesense
