import { Bank, CreditCard, CurrencyDollar, Money } from 'phosphor-react'
import styled, { useTheme } from 'styled-components'

export function PaymentMethod() {
  const theme = useTheme()

  return (
    <PaymentMethodSkin>
      <div className="payment-text">
        <CurrencyDollar size={22} weight="fill" color={theme.purple} />
        <h3>Pagamento</h3>
        <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
      </div>
      <form method="post" className="method-form">
        <fieldset>
          <div className="method">
            <CreditCard size={16} color={theme.purple} />
            <input type="radio" name="payment-method" id="credit-card" />
            <label htmlFor="credit-card">Cartão de crédito</label>
          </div>
          <div className="method">
            <Bank size={16} color={theme.purple} />
            <input type="radio" name="payment-method" id="debit-card" />
            <label htmlFor="debit-card">Cartão de débito</label>
          </div>
          <div className="method">
            <Money size={16} color={theme.purple} />
            <input type="radio" name="payment-method" id="cash" />
            <label htmlFor="cash">Dinheiro</label>
          </div>
        </fieldset>
      </form>
    </PaymentMethodSkin>
  )
}

const PaymentMethodSkin = styled.section`
  background-color: ${(p) => p.theme['base-card']};
  border-radius: ${(p) => p.theme['br-rg']};
  max-width: 40rem;
  padding: 2.5rem;

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

  .method-form fieldset {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10.25rem, 1fr));
    gap: 0.75rem;
  }

  .method {
    background-color: ${(p) => p.theme['base-button']};
    border-radius: ${(p) => p.theme['br-rg']};
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 3.25rem;
    padding-inline: 1rem;
    position: relative;
  }

  .method input[type='radio'] {
    border: none;
    padding: unset;
    appearance: none;
  }

  .method svg {
    color: ${(p) => p.theme.purple};
    width: 1rem;
    pointer-events: none;
    z-index: 1;
  }

  input[type='radio'] + label {
    all: unset;
    border: 1px solid transparent;
    border-radius: inherit;
    font-size: ${(p) => p.theme['fs-b-xs']};
    text-transform: uppercase;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
    transition: ${(p) => p.theme['ts-hover']};
  }

  input[type='radio'] + label:is(:hover) {
    background-color: ${(p) => p.theme['base-hover']};
    color: ${(p) => p.theme['base-subtitle']};
  }

  input[type='radio']:is(input:checked) + label {
    background-color: ${(p) => p.theme['purple-light']};
    border-color: ${(p) => p.theme.purple};
  }
`
