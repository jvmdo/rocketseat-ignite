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

  form {
    display: flex;
    flex-flow: row wrap;
    gap: 0.5rem;
    font-size: 1.125rem;
    font-weight: bold;
  }

  .display {
    font-family: 'Roboto Mono', 'monospace';
    font-size: clamp(5rem, 3.182rem + 9.09vw, 10rem);

    .digit {
      padding-inline: 0.75rem;
      background-color: ${(props) => props.theme['gray-700']};
      border-radius: ${(props) => props.theme['border-radius']};

      &:nth-of-type(odd) {
        margin-right: 1rem;
      }
    }

    .separator {
      color: ${(props) => props.theme['green-500']};
    }
  }
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

const CommonInput = styled.input`
  border: none;
  background: none;
  font: inherit;
  padding-inline: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  color: ${(props) => props.theme['gray-400']};

  &:focus-visible {
    box-shadow: unset;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &[list]::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const TaskInput = styled(CommonInput)`
  flex: 1;
`

export const TimeInput = styled(CommonInput)`
  width: 4rem;
`
