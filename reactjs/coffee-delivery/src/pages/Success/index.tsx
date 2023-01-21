import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import { IconBox } from '../../components/IconBox'
import { Container } from '../../styles/global'
import { SuccessSkin } from './style'
import illustration from '../../assets/illustrations/delivery.png'
import { useLocation } from 'react-router-dom'
import { FormValues } from '../Checkout'

export function Success() {
  const deliveryTime = Math.floor(Math.random() * 50) + 10

  const { state } = useLocation()
  const { rua, numero, bairro, cidade, uf, method }: FormValues = state

  function capetalize(sentence: string) {
    return sentence.replace(
      /^\p{Letter}|\b\p{Letter}{4,}/gu,
      (word) => word[0].toUpperCase() + word.slice(1),
    )
  }

  return (
    <SuccessSkin>
      <Container>
        <img src={illustration} alt="" className="illustration-delivery" />
        <section className="delivery">
          <h1>Uhu! Pedido confirmado</h1>
          <p>Agora é só aguardar que logo o café chegará até você</p>
          <div className="delivery-info">
            <ul className="info-list">
              <li className="info-item">
                <IconBox
                  boxWidth={2}
                  color={'background'}
                  backgroundColor={'purple'}
                  borderRadius={'brCircle'}
                >
                  <MapPin size={16} weight="fill" />
                </IconBox>
                <div className="info-text">
                  <p>
                    Entrega em rua{' '}
                    <span>
                      {capetalize(rua)}, {capetalize(numero)}
                    </span>
                  </p>
                  <p>
                    {capetalize(bairro)} - {capetalize(cidade)},{' '}
                    {uf.toUpperCase()}
                  </p>
                </div>
              </li>
              <li className="info-item">
                <IconBox
                  boxWidth={2}
                  color={'background'}
                  backgroundColor={'yellow'}
                  borderRadius={'brCircle'}
                >
                  <Timer size={16} weight="fill" />
                </IconBox>
                <div className="info-text">
                  <p>Previsão de entrega</p>
                  <p>
                    <span>
                      {deliveryTime} min - {deliveryTime + 10} min
                    </span>
                  </p>
                </div>
              </li>
              <li className="info-item">
                <IconBox
                  boxWidth={2}
                  color={'background'}
                  backgroundColor={'yellowDark'}
                  borderRadius={'brCircle'}
                >
                  <CurrencyDollar size={16} weight="fill" />
                </IconBox>
                <div className="info-text">
                  <p>Pagamento na entrega</p>
                  <p>
                    <span>{capetalize(method)}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </Container>
    </SuccessSkin>
  )
}
