# Makesense design system

The makesense design system is build to make makesense design guidelines and Vue component available accross our multiple web applications. 

Living styleguide demo: https://makesense-design-system.netlify.com

## Usage

### Add dependency
```
yarn add @makesenseorg/design-system
```

or 
```
 npm i @makesenseorg/design-system
```

### Use 
```
import DesignSystem from '@makesenseorg/design-system'
import '@makesenseorg/design-system/dist/system.css'

Vue.use(DesignSystem);
...
```

### Load theme
Just below, load the app theme (list of available themes in  `./src/tokens/themes`)
The default name is `base`

```
...
Vue.prototype.$loadTheme('base')
```


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

## Semantic versioning rules

Code status | Stage	| Rule | Example version
First release | New product | Start with 1.0.0 | 1.0.0
Backward compatible bug fixes |	Patch release |	Increment the third digit | 1.0.1
Backward compatible new features | Minor release | Increment the middle digit and reset last digit to zero | 1.1.0
Changes that break backward compatibility |	Major release |	Increment the first digit and reset middle and last digits to zero | 2.0.0

## Thanks
Thanks to CION design system for providing the design system boilerplate.

## License
[MIT License](./LICENSE) - Copyright (c) Makesense
