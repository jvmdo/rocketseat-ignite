import { Container } from '../../styles/global'
import { OrderSummary } from './components/OrderSummary'
import { PaymentAddress } from './components/PaymentAddress'
import { PaymentMethod } from './components/PaymentMethod'
import { CheckoutSkin } from './style'

const cartItems = [
  {
    image: '/coffee/traditional.png',
    name: 'expresso tradicional',
    price: 5.5,
    quantity: 3,
  },
  {
    image: '/coffee/american.png',
    name: 'expresso americano',
    price: 7.5,
    quantity: 4,
  },
]

export function Checkout() {
  return (
    <CheckoutSkin>
      <Container>
        <PaymentAddress />
        <PaymentMethod />
        <OrderSummary cartItems={cartItems} deliveryFee={5.5} />
      </Container>
    </CheckoutSkin>
  )
}
