import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import { IconBox } from '../../components/IconBox'
import { Container } from '../../styles/global'
import { SuccessSkin } from './style'
import illustration from '../../assets/illustrations/delivery.png'

interface SuccessProps {
  address: string
  number: string
  district: string
  city: string
  state: string
  paymentMethod: string
}

export function Success(props: SuccessProps) {
  const deliveryTime = Math.floor(Math.random() * 50) + 10

  // useEffect?

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
                    Entrega em{' '}
                    <span>
                      Rua {props.address}, {props.number}
                    </span>
                  </p>
                  <p>
                    {props.district} - {props.city}, {props.state}
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
                    <span>{props.paymentMethod}</span>
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
