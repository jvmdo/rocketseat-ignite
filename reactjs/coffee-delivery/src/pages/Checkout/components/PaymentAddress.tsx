import { MapPin } from 'phosphor-react'
import styled, { useTheme } from 'styled-components'

export function PaymentAddress() {
  const theme = useTheme()

  return (
    <PaymentAddressSkin>
      <h2 className="payment-title">Complete seu pedido</h2>
      <div className="form-wrapper">
        <div className="payment-text">
          <MapPin size={22} weight="fill" color={theme['yellow-dark']} />
          <h3>Endereço de Entrega</h3>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
        <form method="post" className="address-form">
          <label htmlFor="cep">
            <input type="tel" id="cep" name="cep" placeholder="CEP" />
          </label>
          <label htmlFor="rua">
            <input type="text" id="rua" name="rua" placeholder="Rua" />
          </label>
          <label htmlFor="numero">
            <input
              type="number"
              id="numero"
              name="numero"
              placeholder="Número"
            />
          </label>
          <label htmlFor="complemento">
            <input
              type="text"
              id="complemento"
              name="complemento"
              placeholder="Complemento"
            />
          </label>
          <label htmlFor="bairro">
            <input type="text" name="bairro" placeholder="Bairro" />
          </label>
          <label htmlFor="cidade">
            <input type="text" id="cidade" name="cidade" placeholder="Cidade" />
          </label>
          <label htmlFor="uf">
            <input type="text" id="uf" name="uf" placeholder="UF" />
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
    margin-bottom: 2rem;
  }

  .form-wrapper {
    background-color: ${(p) => p.theme['base-card']};
    border-radius: ${(p) => p.theme['br-rg']};
    padding: 2.5rem;
  }

  input::placeholder {
    color: ${(p) => p.theme['base-label']};
    font-size: ${(p) => p.theme['fs-b-sm']};
  }

  input:not(:placeholder-shown) {
    z-index: 1;
  }

  input[name] {
    background-color: ${(p) => p.theme['base-input']};
    border: 1px solid ${(p) => p.theme['base-button']};
    border-radius: ${(p) => p.theme['br-sm']};
    font-size: ${(p) => p.theme['fs-b-sm']};
    height: 2.615rem;
    padding-inline: 0.75rem;
  }

  input[name]:focus-visible {
    border-color: ${(p) => p.theme['yellow-dark']};
  }

  input[name='cep'],
  input[name='numero'],
  input[name='bairro'] {
    max-width: 12rem;
  }

  input[name='uf'] {
    max-width: 4rem;
  }

  label[for='complemento'] {
    position: relative;
  }

  /* :not(:focus-within) */
  label[for='complemento']::after {
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

  .address-form {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem 0.75rem;
  }

  label {
    display: flex;
  }

  label[for='cep'] {
    flex: 1 0 100%;
  }

  label[for='rua'] {
    flex: 1 0 100%;
  }

  label[for='complemento'],
  label[for='cidade'] {
    flex: 1;
  }

  label[for='uf'] {
    margin-left: auto;
  }

  label > input {
    flex: 1;
  }
`
