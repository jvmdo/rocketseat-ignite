import { Minus, Plus, Trash } from 'phosphor-react'
import styled, { useTheme } from 'styled-components'
import { IconBox } from '../../../components/IconBox'

interface CoffeeItemProps {
  image: string
  name: string
  price: number
  quantity: number
}

export function CoffeeItem({ image, name, price, quantity }: CoffeeItemProps) {
  const theme = useTheme()

  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

  return (
    <CoffeeItemSkin>
      <img className="coffee-img" src={window.location.origin + image} alt="" />
      <h3 className="coffee-name">{name}</h3>
      <span className="coffee-price">{amount}</span>
      <span className="coffee-add">
        <button type="button" className="add-minus">
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
        <button type="button" className="add-plus">
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
      <button type="button" className="coffee-del">
        <Trash size={16} color={theme.purple} />
        Remover
      </button>
    </CoffeeItemSkin>
  )
}

const CoffeeItemSkin = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto) 1fr;
  gap: 0.5rem;

  .coffee-img {
    grid-row: 1 / span 2;
    margin-right: 0.75rem;
    object-fit: cover;
    height: 4rem;
    width: 4rem;
  }

  .coffee-name {
    grid-column: 2 / span 2;
    color: ${(p) => p.theme['base-subtitle']};
    font-family: ${(p) => p.theme['ff-body']};
    font-size: ${(p) => p.theme['fs-b-rg']};
    font-weight: ${(p) => p.theme['fw-rg']};
    line-height: ${(p) => p.theme['lh-body']};
    text-transform: capitalize;
  }

  .coffee-price {
    margin-left: auto;
    font-weight: ${(p) => p.theme['fw-bd']};
    text-transform: capitalize;
  }

  .coffee-add {
    background-color: ${(p) => p.theme['base-button']};
    border-radius: ${(p) => p.theme['br-rg']};
    color: ${(p) => p.theme['base-title']};
    line-height: 1;
    padding-inline: 0.5rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .coffee-del {
    background-color: ${(p) => p.theme['base-button']};
    border-radius: ${(p) => p.theme['br-rg']};
    color: ${(p) => p.theme['base-text']};
    font-size: ${(p) => p.theme['fs-b-xs']};
    text-transform: uppercase;
    padding-inline: 0.5rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .coffee-del:hover {
    background-color: ${(p) => p.theme['base-hover']};
  }
`
