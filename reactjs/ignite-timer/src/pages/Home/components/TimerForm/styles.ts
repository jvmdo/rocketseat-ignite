import styled from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
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
