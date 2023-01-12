import styled from 'styled-components'

//* It is preferable using styled containers over nesting
// export const FormContainer = styled.form``
// export const ButtonContainer = styled.button``
// ...

export const HomeContainer = styled.main`
  flex: 1;
  max-width: 41rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 4rem;
  color: ${(props) => props.theme['gray-100']};
`

const CommonButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  align-self: stretch;
  height: 4rem;
  color: inherit;
  cursor: pointer;
  font-weight: bold;
  border-radius: ${(props) => props.theme['border-radius']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartButton = styled(CommonButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):is(:hover, :focus-visible) {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const StopButton = styled(CommonButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled):is(:hover, :focus-visible) {
    background-color: ${(props) => props.theme['red-700']};
  }
`
