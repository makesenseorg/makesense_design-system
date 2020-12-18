# Makesense design system

[![NPM](https://nodei.co/npm/@makesenseorg/design-system.png?mini=true)](https://www.npmjs.com/package/@makesenseorg/design-system)

The makesense design system is build to make makesense design guidelines and Vue component available accross our multiple web applications.

Living styleguide demo: https://makesense-design-system.netlify.com

## Table of contents
1. [Use in a Nuxt app](#nuxt)
    1. [Add as a dependency](#nuxt-1)
    2. [Create a plugin](#nuxt-2)
    3. [Change the theme colors](#nuxt-3)
    4. [Import the styles and variables](#nuxt-4)
    5. [Usage](#nuxt-5)
2. [Use in a Vue app](#vue)
    1. [Install dependency](#vue-1)
    2. [Import in the app](#vue-2)
    3. [Change the theme colors](#vue-3)
    4. [Import the styles and variables](#vue-4)
    5. [Usage](#vue-5)
3. [Contributing](#contributing)
    1. [Developing](#developing)
    2. [Testing](#testing)
    2. [Building](#building)
    2. [Publishing](#publishing)

## Use in a Nuxt app  <a name="nuxt"></a>

### 1. Add as a dependency <a name="nuxt-1"></a>

```js
npm i @makesenseorg/design-system
```

### 2. Create a plugin <a name="nuxt-2"></a>

Add the plugin in `nuxt.config.js`.

```js
plugins: ["~/plugins/design-system"],
```

Create the file `design-system.js` in `plugins` folder.

```js
import Vue from 'vue'
import DesignSystem from '@makesenseorg/design-system'
import '@makesenseorg/design-system/dist/system.css'

Vue.use(DesignSystem);
...
```

### 3. Change the theme colors <a name="nuxt-3"></a>

Just below, load the app theme, to get all the colors related to your app. The theme needs to exist in the design system. (list of available themes in `./src/tokens/themes`)
The default name is `base`.

```js
...
if (process.client) {
  Vue.prototype.$loadTheme('base')
}
```

You can also change the theme using `this.$loadTheme(theme_name)` inside a view or a component.

> **⚠️  Warning ⚠️**
> It is important to only use `loadTheme` on the client side, as it would throw a `document is not defined` error on the server side.

### 4. Import the styles <a name="nuxt-4"></a>

In order to have access to the design system variables and mixins, you need to import the `shared.scss` file either locally in each component, or once globally in the app.
The `system.css` file is a global file providing reset classes, fonts, and basic styling.

#### 1. Install style-ressources <a name="nuxt-4-1"></a>

In order to load the styles globally, you need to install style-resources module

```
npm install --save-dev @nuxtjs/style-resources
```

#### 2. Update nuxt.config.js <a name="nuxt-4-2"></a>

In `nuxt.config.js`, register the module and add the style files

```js
css: ["@makesenseorg/design-system/dist/system.css"],
modules: [
    '@nuxtjs/style-resources',
],
styleResources: {
    scss: [
      "@makesenseorg/design-system/dist/shared.scss",
    ],
},
```

✨ **You're done! You can now use the components, mixins, scss variables.** ✨

### 5. Usage <a name="vue-5"></a>

In your App or in your app components, use the design system components like so : 

```vue
<template>
    <div class="my-app">
        <mks-heading tag="h1">Hello world !</mks-heading>
    </div>
<template/>

<script>
import MksHeading from "@makesenseorg/design-system/dist/components/Heading.vue";

export default {
  name: "App",
  components: { MksHeading }
}
</script>

<style lang="scss">
.my-app {
  background: $color-primary;
}
</style>
```

## Use in a Vue app <a name="vue"></a>

### 1. Install dependency <a name="vue-1"></a>

```
npm i @makesenseorg/design-system
```

### 2. Import in the app <a name="vue-2"></a>

Import the design system in the app entry file (usually `index.js` or `main.js`)

```js
import DesignSystem from '@makesenseorg/design-system'
import '@makesenseorg/design-system/dist/system.css'

Vue.use(DesignSystem);
...
```

### 3. Change the theme colors <a name="vue-3"></a>

Just below, load the app theme, to get all the colors related to your app. The theme needs to exist in the design system. (list of available themes in `./src/tokens/themes`)
The default name is `base`.

```js
...
Vue.prototype.$loadTheme('base')
```

You can also change the theme using `this.$loadTheme(theme_name)` inside a view or a component.

### 4. Import the styles and variables <a name="vue-4"></a>

In order to have access to the design system variables and mixins, you need to import the `shared.scss` file.

```js
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

✨ **You're done! You can now use the components, mixins, scss variables.** ✨

### 5. Usage <a name="vue-5"></a>

In your App or in your app components, use the design system components like so : 

```vue
<template>
    <div class="my-app">
        <mks-heading tag="h1">Hello world !</mks-heading>
    </div>
<template/>

<script>
import MksHeading from "@makesenseorg/design-system/dist/components/Heading.vue";

export default {
  name: "App",
  components: { MksHeading }
}
</script>

<style lang="scss">
.my-app {
  background: $color-primary;
}
</style>
```

## Contributing <a name="contributing"></a>

```
npm install
```

### 1. Developing <a name="developing"></a>

Compiles and hot-reloads living styleguide

```
npm run dev
```

### 2. Testing new components in a live playground <a name="testing"></a>

Compiles design system and uses it in a nuxt app.
Before publishing new components, please test them in this playground app.

The first time you use the playground, run :

```
npm run install-playground
```

When you want to test a component in the playground, run :

```
npm run playground
```

Note: the command takes a while because it needs to build the system first in order to inject it as a dependency in the playground.

### 3. Building <a name="building"></a>

#### Living styleguide <a name="styleguide"></a>

Compiles living styleguide to `./docs`

```
npm run build
```

#### Library <a name="library"></a>

Compiles design system as a library to `./dist`

```
npm run build:system
```

### 4. Helper <a name="helper"></a>

#### Serve living styleguide locally <a name="serving"></a>

for example to develop on another application with a newer version of the styleguide

```
npm run serve
```

#### Lints and fixes files <a name="linting"></a>

```
npm run lint
```

### 5. Publishing <a name="publishing"></a>

The repo is automatically publish when the version is updated and pushed to master.

#### Semantic versioning rules <a name="semantic"></a>

| Code status                               | Stage         | Rule                                                               | Example version |
| ----------------------------------------- | ------------- | ------------------------------------------------------------------ | --------------- |
| First release                             | New product   | Start with 1.0.0                                                   | 1.0.0           |
| Backward compatible bug fixes             | Patch release | Increment the third digit                                          | 1.0.1           |
| Backward compatible new features          | Minor release | Increment the middle digit and reset last digit to zero            | 1.1.0           |
| Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0           |

## Thanks

Thanks to CION design system for providing the design system boilerplate.

## License

[MIT License](./LICENSE) - Copyright (c) Makesense
