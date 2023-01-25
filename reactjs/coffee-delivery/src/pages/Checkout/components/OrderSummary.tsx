import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FormValues } from '../index'
import { breakpoint } from '../../../styles/global'
import { CoffeeItem } from './CoffeeItem'
import { useFormContext } from 'react-hook-form'
import { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'
import { currencyFormatter } from '../../../utils/utils'

const deliveryFee = Math.floor(Math.random() * 11)

export function OrderSummary() {
  const navigateTo = useNavigate()
  const {
    getValues,
    reset,
    formState: { isValid },
  } = useFormContext<FormValues>()
  const cart = useContext(CartContext)

  const itemsTotal = cart.items.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0,
  )
  const total = itemsTotal + deliveryFee

  const itemsTotalCurrency = currencyFormatter(itemsTotal)
  const totalCurrency = currencyFormatter(total)
  const deliveryFeeCurrency = deliveryFee
    ? currencyFormatter(deliveryFee)
    : 'Grátis'

  function handleNavigation() {
    document.querySelectorAll('form').forEach((form) => form.requestSubmit())

    if (isValid) {
      navigateTo('/success', {
        state: { ...getValues() },
      })
      cart.clear()
      reset()
    }
  }

  return (
    <OrderSummarySkin>
      <h2 className="payment-title">Cafés selecionados</h2>
      <div className="order-wrapper">
        <ul className="order-list">
          {cart.items.map((item, index) => (
            <li key={item.name} className="order-item">
              <CoffeeItem {...item} index={index} />
            </li>
          ))}
        </ul>
        {itemsTotal ? (
          <ul className="order-total">
            <li className="items-price">
              <span>Total de itens</span>
              <span>{itemsTotalCurrency}</span>
            </li>
            <li className="items-delivery">
              <span>Taxa de entrega</span>
              <span>{deliveryFeeCurrency}</span>
            </li>
            <li className="items-total">
              <span>Total</span>
              <span>{totalCurrency}</span>
            </li>
          </ul>
        ) : (
          <p className="empty-message">Escolha pelo menos 1 unidade de café</p>
        )}
        <button
          type="submit"
          className="order-confirm"
          onClick={handleNavigation}
          disabled={!itemsTotal}
        >
          Confirmar pedido
        </button>
      </div>
    </OrderSummarySkin>
  )
}

export const OrderSummarySkin = styled.section`
  max-width: 40rem;

  .payment-title {
    color: ${(p) => p.theme['base-subtitle']};
    font-size: ${(p) => p.theme['fs-h-sm']};
    font-weight: ${(p) => p.theme['fw-bd']};
    margin-bottom: 1rem;
  }

  .order-wrapper {
    background-color: ${(p) => p.theme['base-card']};
    border-radius: 6px 44px;
    padding: 2.5rem;
  }

  .order-item {
    border-bottom: 1px solid ${(p) => p.theme['base-button']};
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }

  & :is(.items-price, .items-delivery, .items-total) {
    display: flex;
    justify-content: space-between;
  }

  & :is(.items-price, .items-delivery) span:first-of-type {
    font-size: ${(p) => p.theme['fs-b-sm']};
    margin-bottom: 0.75rem;
  }

  .empty-message {
    color: ${(p) => p.theme['yellow-dark']};
    font-size: ${(p) => p.theme['fs-h-rg']};
    font-weight: ${(p) => p.theme['fw-bd']};
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .items-total {
    color: ${(p) => p.theme['base-subtitle']};
    font-size: ${(p) => p.theme['fs-b-xl']};
    font-weight: ${(p) => p.theme['fw-bd']};
    margin-bottom: 1.5rem;
  }

  .order-confirm {
    background-color: ${(p) => p.theme.yellow};
    border-radius: ${(p) => p.theme['br-rg']};
    color: ${(p) => p.theme.white};
    font-size: ${(p) => p.theme['fs-b-sm']};
    font-weight: ${(p) => p.theme['fw-bd']};
    text-transform: uppercase;
    height: 3rem;
    width: 100%;
    padding-inline: 0.75rem;
  }

  .order-confirm:disabled {
    background-color: ${(p) => p.theme['base-hover']};
    cursor: not-allowed;
  }

  .order-confirm:is(:hover, :focus-visible) {
    background-color: ${(p) => p.theme['yellow-dark']};
  }

  @media (min-width: ${breakpoint.lg}) {
    .order-wrapper {
      min-height: 375px;
      padding-inline: clamp(
        2rem,
        -0.909rem + 4.55vw,
        2.5rem
      ); /* 1024px - 1200px */
    }
  }
`
