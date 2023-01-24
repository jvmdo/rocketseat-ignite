import { FormProvider, useForm } from 'react-hook-form'
import { Container } from '../../styles/global'
import { OrderSummary } from './components/OrderSummary'
import { PaymentAddress } from './components/PaymentAddress'
import { PaymentMethod } from './components/PaymentMethod'
import { CheckoutSkin } from './style'

export type FormValues = {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  method: string
}

export function Checkout() {
  const methods = useForm<FormValues>({
    defaultValues: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      method: '',
    },
  })

  return (
    <FormProvider {...methods}>
      <CheckoutSkin>
        <Container>
          <PaymentAddress />
          <PaymentMethod />
          <OrderSummary />
        </Container>
      </CheckoutSkin>
    </FormProvider>
  )
}
