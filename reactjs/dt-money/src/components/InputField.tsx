import { ErrorMessage } from '@hookform/error-message'
import { InputHTMLAttributes } from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'
import styled from 'styled-components'

const StyledInputField = styled.div`
  label {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  input {
    background-color: ${(p) => p.theme['gray-900']};
    border: none;
    border-radius: ${(p) => p.theme.br};
    color: ${(p) => p.theme['gray-300']};
    font-size: clamp(1rem, 0.924rem + 0.32vw, 1.125rem);
    height: 3.375rem;
    width: 100%;
    padding-inline: 1rem;

    &::placeholder {
      color: ${(p) => p.theme['gray-500']};
      font-size: ${(p) => p.theme.fs};
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px ${(p) => p.theme['green-500']};
    }

    &:not(:placeholder-shown):invalid {
      box-shadow: 0 0 0 2px ${(p) => p.theme['red-500']};
    }
  }

  span {
    color: ${(p) => p.theme['red-500']};
    font-size: ${(p) => p.theme['fs-xm']};
    font-weight: ${(p) => p.theme['fw-b']};
    display: inline-block;
    margin: 0.25rem;
  }
`

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  register: (name: string) => InputHTMLAttributes<HTMLInputElement>
  errors?: FieldErrors<FieldValues>
}

export function InputField(props: InputFieldProps) {
  return (
    <StyledInputField>
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
      {props.errors && (
        <ErrorMessage
          errors={props.errors}
          name={props.name}
          render={({ message }) => <span>{message}</span>}
        />
      )}
    </StyledInputField>
  )
}
