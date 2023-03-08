import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
  margin: 0;
  padding: 0;
  outline-color: ${(p) => p.theme.blue};
  box-sizing: border-box
}

html {
  background-color: ${(p) => p.theme.background};
  color-scheme: light dark;
  font-family: ${(p) => p.theme['font-family']};
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}

body {
  color: ${(p) => p.theme.text};
  line-height: ${(p) => p.theme['line-height']};
  min-height: 100dvh;
  min-width: 20rem;
  padding-bottom: clamp(7rem, 3.353rem + 15.56vw, 13rem);
}

h1 {
  line-height: 1.3;
}

a {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  text-decoration-skip-ink: none;
}

a:focus-visible {
  outline: none;
}

button {
  border: none;
  cursor: pointer;
  font: inherit;
}

input {
  border: none;
  font: inherit;
}

img, svg {
  max-width: 100%;
  vertical-align: middle;
}
`

export const breakpoint = {
  xxs: '20em',
  xs: '23.4375em',
  sm: '36em',
  md: '48em',
  lg: '62em',
} as const

export const ContentContainer = styled.div`
  /* 12px to 24px, from 320px to 375px */
  --fluid-padding: clamp(0.75rem, -3.614rem + 21.82vw, 1.5rem);

  /* 24px to 48px, from 375px to 992px  */
  @media (min-width: ${breakpoint.xs}) {
    --fluid-padding: clamp(1.5rem, 0.588rem + 3.89vw, 3rem);
  }

  --base-width: 54rem;
  max-width: calc(var(--base-width) + 2 * var(--fluid-padding));
  margin-inline: auto;
  padding-inline: var(--fluid-padding);
`
