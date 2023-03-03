import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const SInputField = styled.div`
  label {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  input {
    background-color: ${(p) => p.theme.input};
    border: none;
    outline: 1px solid ${(p) => p.theme.border};
    border-radius: ${(p) => p.theme['br-xs']};
    color: ${(p) => p.theme.text};
    font-size: clamp(1rem, 0.924rem + 0.32vw, 1.125rem);
    height: 3.125rem;
    width: 100%;
    padding: 0.75rem 1rem;

    &::placeholder {
      color: ${(p) => p.theme.label};
      font-size: ${(p) => p.theme.fs};
    }

    &:focus-visible {
      outline-color: ${(p) => p.theme.blue};
    }
  }
`

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  register: (name: string) => InputHTMLAttributes<HTMLInputElement>
}

export function InputField(props: InputFieldProps) {
  return (
    <SInputField>
      <label htmlFor={props.name}>{props.name}</label>
      <input
        type={props.type}
        id={props.name}
        autoComplete={props.autoComplete}
        placeholder={
          props.placeholder ?? props.name?.replace(/\w/, (m) => m.toUpperCase())
        }
        {...props.register(props.name)}
      />
    </SInputField>
  )
}
