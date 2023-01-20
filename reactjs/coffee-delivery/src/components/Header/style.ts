import styled from 'styled-components'

export const Navbar = styled.nav`
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
