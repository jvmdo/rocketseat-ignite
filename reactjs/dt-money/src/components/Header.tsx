import styled from 'styled-components'
import { ContentContainer } from '../styles/global'
import logo from '../assets/logo.svg'
import { TransactionDialog } from './TransactionDialog'
import { TransactionButton } from './TransactionButton'

const StyledHeader = styled.header`
  background-color: ${(p) => p.theme['gray-900']};
  height: 13rem;
  padding-block: 2.5rem;

  ${ContentContainer} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const StyledLogo = styled.img`
  margin-left: -0.25rem;
  width: clamp(7rem, 4.569rem + 10.37vw, 11rem);
`

export function Header() {
  function handleClick() {
    console.count('Click')
  }

  return (
    <StyledHeader>
      <ContentContainer>
        <StyledLogo src={logo} alt="" />
        <TransactionDialog>
          <TransactionButton onClick={handleClick}>
            New transaction
          </TransactionButton>
        </TransactionDialog>
      </ContentContainer>
    </StyledHeader>
  )
}
