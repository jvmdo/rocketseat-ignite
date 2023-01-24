import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { IconBox } from '../../../../../components/IconBox'
import { CartContext } from '../../../../../contexts/CartContext'

interface CoffeeCardProps {
  image: string
  tags: string[]
  name: string
  description: string
  price: number
}

export function CoffeeCard({
  image,
  tags,
  name,
  description,
  price,
}: CoffeeCardProps) {
  const formatOptions = { style: 'currency', currency: 'BRL' }
  const numberFormat = new Intl.NumberFormat('pt-BR', formatOptions)
  const partValues = numberFormat.formatToParts(price).map((p) => p.value)

  const currency = partValues[0]
  const amount = partValues.slice(2).join('')

  const [quantity, setQuantity] = useState(1)
  const cart = useContext(CartContext)

  function handleAddQuantity() {
    setQuantity((state) => ++state)
  }

  function handleSubQuantity() {
    quantity && setQuantity((state) => --state)
  }

  function handleInsertItem() {
    quantity && cart.insert({ image, name, price, quantity })
  }

  return (
    <CoffeeCardSkin>
      <div className="coffee-card-head">
        <img
          className="coffee-img"
          src={window.location.origin + image}
          alt=""
        />
        <div className="coffee-tag-list">
          {tags.map((tag) => (
            <span key={tag} className="coffee-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="coffee-card-body">
        <h3 className="coffee-name">{name}</h3>
        <p className="coffee-description">{description}</p>
      </div>
      <div className="coffee-card-bottom">
        <span className="coffee-price">
          <span className="coffee-currency">{currency}</span>
          {amount}
        </span>
        <span className="coffee-add">
          <button
            type="button"
            className="add-minus"
            onClick={handleSubQuantity}
          >
            <IconBox
              boxWidth={1}
              color={'purple'}
              borderRadius={'brCircle'}
              backgroundColor={'baseButton'}
              hoverBackgroundColor={'purple'}
            >
              <Minus size={14} />
            </IconBox>
          </button>
          {quantity}
          <button
            type="button"
            className="add-plus"
            onClick={handleAddQuantity}
          >
            <IconBox
              boxWidth={1}
              color={'purple'}
              borderRadius={'brCircle'}
              backgroundColor={'baseButton'}
              hoverBackgroundColor={'purple'}
            >
              <Plus size={14} />
            </IconBox>
          </button>
        </span>
        <button
          type="button"
          className="coffee-buy"
          title="Adicionar ao carrinho"
          onClick={handleInsertItem}
        >
          <IconBox
            boxWidth={2.5}
            color={'baseCard'}
            backgroundColor={'purpleDark'}
            hoverBackgroundColor={'purple'}
          >
            <ShoppingCartSimple size={22} weight="fill" />
          </IconBox>
        </button>
      </div>
    </CoffeeCardSkin>
  )
}

const CoffeeCardSkin = styled.div`
  background-color: ${(p) => p.theme['base-card']};
  border-radius: 0.375rem 2.25rem;
  width: 16rem;
  min-height: 20rem;
  padding: 0 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  .coffee-img {
    margin-block: -1.5rem 0.75rem;
  }

  .coffee-tag-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .coffee-tag {
    background-color: ${(p) => p.theme['yellow-light']};
    border-radius: 100vw;
    color: ${(p) => p.theme['yellow-dark']};
    font-size: ${(p) => p.theme['fs-b-xxs']};
    font-weight: ${(p) => p.theme['fw-bd']};
    text-transform: uppercase;
    padding-inline: 0.5rem;
    height: 1.25rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
  }

  .coffee-name {
    color: ${(p) => p.theme['base-subtitle']};
    font-size: ${(p) => p.theme['fs-h-rg']};
    font-weight: ${(p) => p.theme['fw-bd']};
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }

  .coffee-description {
    color: ${(p) => p.theme['base-label']};
    font-size: ${(p) => p.theme['fs-b-sm']};
  }

  .coffee-card-bottom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }

  .coffee-currency {
    font-family: ${(p) => p.theme['ff-body']};
    font-size: ${(p) => p.theme['fs-b-xs']};
    font-weight: ${(p) => p.theme['fw-rg']};
    vertical-align: top;
    margin-right: 0.125rem;
  }

  .coffee-price {
    font-family: ${(p) => p.theme['ff-heading']};
    font-size: ${(p) => p.theme['fs-h-lg']};
    font-weight: ${(p) => p.theme['fw-xbd']};
    line-height: 0.4;
    margin-right: auto;
  }

  .coffee-add {
    background-color: ${(p) => p.theme['base-button']};
    border-radius: ${(p) => p.theme['br-rg']};
    color: ${(p) => p.theme['base-title']};
    padding-inline: 0.5rem;
    height: 2.375rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .coffee-add :is(.add-plus, .add-minus) {
    display: inline-flex;
    transition: ${(p) => p.theme['ts-hover']};
  }

  .coffee-add :is(.add-plus, .add-minus):is(:hover, :focus-visible) {
    color: ${(p) => p.theme['purple-dark']};
  }
`
