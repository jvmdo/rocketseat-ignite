import styled, { css } from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      ${(props) =>
        css`
          color: ${props.theme['gray-100']};
        `};

      &:is(:hover, :focus-visible) {
        ${(props) =>
          css`
            border-bottom: 3px solid ${props.theme['green-500']};
          `};
      }

      &.active {
        ${(props) =>
          css`
            color: ${props.theme['green-500']};
          `};
      }
    }
  }
`
