import styled from 'styled-components'
import { breakpoint, Container } from '../../styles/global'
import { OrderSummarySkin } from './components/OrderSummary'

export const CheckoutSkin = styled.main`
  & > ${Container} {
    display: grid;
    justify-content: center;
    row-gap: 0.75rem;
    margin-bottom: 6rem;
  }

  @media (min-width: ${breakpoint.lg}) {
    & > ${Container} {
      grid-template-columns: 10fr 7fr;
      grid-template-rows: auto auto 1fr;
      align-items: start;
      column-gap: clamp(1rem, -4.818rem + 9.09vw, 2rem); /* 1024px - 1200px */
    }

    ${OrderSummarySkin} {
      grid-area: 1 / 2 / -1 / -1;
    }
  }
`
