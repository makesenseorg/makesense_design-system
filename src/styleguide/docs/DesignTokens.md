Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.

You can use tokens as SCSS variables or import them in your JS:
```
import { tokens } from 'system'
```
<mks-icon type="alert-circle" color="warning"></mks-icon> 
<mks-text size="small" color="light"> Known bug: The values indicated by <code>*</code> only work with the base theme for now </mks-text>

<design-tokens />
