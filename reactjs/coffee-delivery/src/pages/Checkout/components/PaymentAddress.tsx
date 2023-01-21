import { ErrorMessage } from '@hookform/error-message'
import { MapPin, WarningOctagon } from 'phosphor-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled, { useTheme } from 'styled-components'
import { FormValues } from '../index'

interface InputErrorMessage {
  message?: string
}

export function PaymentAddress() {
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useFormContext<FormValues>()
  const [requiredMessage, setRequiredMessage] = useState(false)

  function handleSuccessSubmit(data: FormValues) {
    // console.log('[payment address] Success submit', data)
    setRequiredMessage(false)
  }

  function handleFailSubmit() {
    console.log('[payment address] Fail submit', errors)
    const isInvalid = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'uf'].some(
      (key) => getFieldState(key as any).invalid,
    )
    setRequiredMessage(isInvalid)
  }

  function displayRequiredMessage({ message }: InputErrorMessage) {
    return (
      <span className="warningIcon">
        {message} {<WarningOctagon size={22} color="tomato" weight="fill" />}
      </span>
    )
  }

  return (
    <PaymentAddressSkin>
      <h2 className="payment-title">Complete seu pedido</h2>
      <div className="form-wrapper">
        <div className="payment-text">
          <MapPin size={22} weight="fill" color={theme['yellow-dark']} />
          <h3>Endereço de Entrega</h3>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
        {requiredMessage && (
          <span className="errorMessage">
            <WarningOctagon size={22} color="tomato" weight="fill" />
            Campos obrigatórios
          </span>
        )}
        <form
          method="post"
          className="address-form"
          onSubmit={handleSubmit(handleSuccessSubmit, handleFailSubmit)}
        >
          <label className="forCep">
            <input
              type="tel"
              placeholder="CEP"
              {...register('cep', {
                required: true,
                pattern: {
                  value: /^\d{5}-\d{3}$/,
                  message: 'CEP digitado não segue o padrão 12345-890',
                },
              })}
            />
            <ErrorMessage name="cep" render={displayRequiredMessage} />
          </label>
          <label className="forRua">
            <input
              placeholder="Rua"
              {...register('rua', {
                required: true,
              })}
            />
            <ErrorMessage name="rua" render={displayRequiredMessage} />
          </label>
          <label className="forNumero">
            <input
              placeholder="Número"
              {...register('numero', {
                required: true,
              })}
            />
            <ErrorMessage name="numero" render={displayRequiredMessage} />
          </label>
          <label className="forComplemento">
            <input placeholder="Complemento" {...register('complemento')} />
            <ErrorMessage name="complemento" render={displayRequiredMessage} />
          </label>
          <label className="forBairro">
            <input
              placeholder="Bairro"
              {...register('bairro', {
                required: true,
              })}
            />
            <ErrorMessage name="bairro" render={displayRequiredMessage} />
          </label>
          <label className="forCidade">
            <input
              placeholder="Cidade"
              {...register('cidade', {
                required: true,
              })}
            />
            <ErrorMessage name="cidade" render={displayRequiredMessage} />
          </label>
          <label className="forUf">
            <input
              placeholder="UF"
              {...register('uf', {
                required: true,
                maxLength: 2,
                minLength: 2,
              })}
            />
            <ErrorMessage name="uf" render={displayRequiredMessage} />
          </label>
        </form>
      </div>
    </PaymentAddressSkin>
  )
}

const PaymentAddressSkin = styled.section`
  max-width: 40rem;

  .payment-title {
    color: ${(p) => p.theme['base-subtitle']};
    font-size: ${(p) => p.theme['fs-h-sm']};
    font-weight: ${(p) => p.theme['fw-bd']};
    margin-bottom: 1rem;
  }

  .payment-text {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .payment-text h3 {
    color: ${(p) => p.theme['base-subtitle']};
    font-family: ${(p) => p.theme['ff-body']};
    font-size: ${(p) => p.theme['fs-b-rg']};
    font-weight: ${(p) => p.theme['fw-rg']};
  }

  .payment-text p {
    grid-column: 2 / 3;
    font-size: ${(p) => p.theme['fs-b-sm']};
  }

  .form-wrapper {
    background-color: ${(p) => p.theme['base-card']};
    border-radius: ${(p) => p.theme['br-rg']};
    padding: 2.5rem;
  }

  .address-form {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem 0.75rem;
  }

  .errorMessage {
    color: orangered;
    font-size: ${(p) => p.theme['fs-b-rg']};
    font-weight: ${(p) => p.theme['fw-bd']};
    font-style: italic;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .warningIcon {
    position: absolute;
    right: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    line-height: 0;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: ${(p) => p.theme['fs-b-sm']};
    font-weight: ${(p) => p.theme['fw-bd']};
    color: tomato;
  }

  input::placeholder {
    color: ${(p) => p.theme['base-label']};
    font-size: ${(p) => p.theme['fs-b-sm']};
  }

  input {
    background-color: ${(p) => p.theme['base-input']};
    border: 1px solid ${(p) => p.theme['base-button']};
    border-radius: ${(p) => p.theme['br-sm']};
    font-size: ${(p) => p.theme['fs-b-sm']};
    height: 2.615rem;
    padding-inline: 0.75rem;
  }

  input:focus-visible {
    border-color: ${(p) => p.theme['yellow-dark']};
  }

  input:not(:placeholder-shown) {
    z-index: 1;
  }

  input[name='cep'],
  input[name='numero'],
  input[name='bairro'] {
    max-width: 12rem;
  }

  input[name='uf'] {
    max-width: 4rem;
  }

  label {
    display: flex;
    position: relative;
  }

  label > input {
    flex: 1;
  }

  label.forComplemento::after {
    content: 'Opcional';
    color: ${(p) => p.theme['base-label']};
    font-style: italic;
    font-size: ${(p) => p.theme['fs-b-xs']};
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding-inline: 0.75rem;
  }

  label.forCep,
  label.forRua {
    flex: 1 0 100%;
  }

  label.forComplemento,
  label.forCidade {
    flex: 1;
  }

  label.forUf {
    margin-left: auto;
  }
`
