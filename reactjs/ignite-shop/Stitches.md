# Stitches Foundations

## What is Stitches

Stitches is a styling CSS-in-JS library for React focused in performance and developer experience.

### Key features

- Performance
- SSR
- Variants
- Tokens (predefined properties whose can be assigned custom values)
- Theming
- Utils (custom CSS properties as functions that returns values)
- Responsive variants (breakpoints)
- Overrides (including `as` polymorphism)
- Out of the box typing.

## Stitches Basics

### Installation

```npm install @stitches/react```

### Configuration

`import { createStitches } from '@stitches/react'` method in a `stitches.config.ts` file.

This method receives a configuration object:

```ts
{
    theme: {...},
    media: {...},
    utils: {...},
    prefix: {...},
    themeMap: {...},
}
```

And it returns the following functions:

```ts
{
    styled,
    css,
    globalCss,
    theme,
    createTheme,
    getCssText,
    keyframes,
    config
}
```

Configuration done, just `import { styled } from 'path-to/stitches.config'`

### Styling

Stitches makes use of style objects (the same object that is passed in a `style` property of components)

```jsx
const button = styled('button', {
    color: $primary,
    backgroundColor: $background,
    '&:hover': {
        border: 2px dashed $secondary,
    },
    '&::before': {
        content: '->'
    },
})

<Button>Click me</Button>
```

### API

- `createStitches(configurationObject)`: function that generates a Stitches configuration.

- `styled(HTMLElement | Component){ styleObjects }`: function that creates a component.

- `css(styleObject)`: function that generates class names from style objects.

- `globalCss()`: used to write global CSS styles, such resets. It returns another function that must be invoked in your app.

- `getCssText()`: function that generates SSR styles. It can be used in Next.js this way:

    ```jsx
    <Head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
    </Head>
    ```

- `theme`: object containg the default theme data.

- `createTheme(themeObject)`: function that creates a theme to override the default one.

- `keyframes(styleObject)`: function that generates global `@keyframe` at-rule
