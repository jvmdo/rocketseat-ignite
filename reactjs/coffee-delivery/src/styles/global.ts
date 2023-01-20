import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  /* Reset */
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    vertical-align: top;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background: none;
  }

  ul {
    list-style-type: none;
  }

  /* General */
  html {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme['base-text']};
    font-family: ${({ theme }) => theme['ff-body']};
    font-size: 75%;
    font-weight: ${({ theme }) => theme['fw-rg']};
  }

  @media (min-width: 36em) {
    html {
      font-size: 87.5%;
    }
  }

  @media (min-width: 48em) {
    html {
      font-size: 100%;
    }
  }

  body {
    line-height: ${({ theme }) => theme['lh-body']};
    min-width: 26.667rem;
    min-height: 100vh;
    text-rendering: optimizeSpeed;
  }

  h1,
  h2,
  h3 {
    line-height: ${({ theme }) => theme['lh-heading']};
    font-family: ${({ theme }) => theme['ff-heading']};
    font-weight: ${({ theme }) => theme['fw-xbd']};
  }

  .icon {
    width: 1.375rem;
    transition: ${({ theme }) => theme['ts-hover']};
  }

  input,
  button {
    transition: ${({ theme }) => theme['ts-hover']};
  }
`
export const Container = styled.div`
  max-width: 74rem;
  margin-inline: auto;
  padding-inline: clamp(0.75rem, 0.028rem + 3.08vw, 2rem); /* 375px - 1024px */
`

export const breakpoint = {
  md: '48rem',
  lg: '64rem',
}
