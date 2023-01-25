import styled from 'styled-components'

export const HeaderSkin = styled.header`
  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 2px 6px ${({ theme }) => theme['purple-light']};
  margin-bottom: 3rem;
  top: -5rem;
  transition: ${({ theme }) => theme['ts-hover']};

  &.sticky {
    position: sticky;
    top: 0;
    z-index: 10;
  }
`

export const NavbarSkin = styled.nav`
  display: flex;
  gap: 0.75rem;
  padding-block: 2rem;

  & > a:nth-of-type(2) {
    margin-left: auto;
  }

  & .location {
    background-color: ${({ theme }) => theme['purple-light']};
    border-radius: ${({ theme }) => theme['br-rg']};
    color: ${({ theme }) => theme['purple-dark']};
    font-size: ${({ theme }) => theme['fs-b-sm']};
    padding: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    height: 2.5rem;
  }
`
