import { Container } from '../../../../styles/global'
import coffeeIllustration from '../../../../assets/illustrations/coffee.png'
import { IconBox } from '../../../../components/IconBox'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { IntroSectionSkin } from './style'

export function IntroSection() {
  return (
    <IntroSectionSkin>
      <Container>
        <div className="intro-illustration">
          <img src={coffeeIllustration} alt="" />
        </div>
        <div className="intro-body">
          <h1 className="title">
            Encontre o café perfeito para qualquer hora do dia
          </h1>
          <p>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
          <div className="features">
            <ul>
              <li>
                <IconBox
                  boxWidth={2}
                  color={'background'}
                  backgroundColor={'yellowDark'}
                  borderRadius={'brCircle'}
                >
                  <ShoppingCart size={16} weight="fill" />
                </IconBox>
                Compra simples e segura
              </li>
              <li>
                <IconBox
                  boxWidth={2}
                  color={'background'}
                  backgroundColor={'yellow'}
                  borderRadius={'brCircle'}
                >
                  <Timer size={16} weight="fill" />
                </IconBox>
                Entrega rápida e rastreada
              </li>
            </ul>
            <ul>
              <li>
                <IconBox
                  boxWidth={2}
                  color={'background'}
                  backgroundColor={'baseText'}
                  borderRadius={'brCircle'}
                >
                  <Package size={16} weight="fill" />
                </IconBox>
                Embalagem mantém o café intacto
              </li>
              <li>
                <IconBox
                  boxWidth={2}
                  color={'background'}
                  backgroundColor={'purple'}
                  borderRadius={'brCircle'}
                >
                  <Coffee size={16} weight="fill" />
                </IconBox>
                O café chega fresquinho até você
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </IntroSectionSkin>
  )
}
