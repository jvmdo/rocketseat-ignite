import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.white};
  }

  body {
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
    line-height: 1.6;
    min-width: 20rem;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
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
  /* From 12px to 24px, from 320px to 375px */
  --fluid-padding: clamp(0.75rem, -3.614rem + 21.82vw, 1.5rem);

  /* From 24px to 48px, from 375px to 992px  */
  @media (min-width: ${breakpoint.xs}) {
    --fluid-padding: clamp(1.5rem, 0.588rem + 3.89vw, 3rem);
  }

  max-width: calc(70rem + 2 * var(--fluid-padding));
  margin-inline: auto;
  padding-inline: var(--fluid-padding);
`
