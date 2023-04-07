import { useCart } from '@/hooks/useCart'
import { styled, config } from '@/styles/stitches.config'
import { Minus, Plus, TrashSimple } from 'phosphor-react'

const { fontSizes: fs } = config.theme

/* 
  Styles
*/
const S_ItemControl = styled('div', {
  display: 'flex',
  gap: '1rem',

  '& > button': {
    color: '$green500',
    fluidFontSize: { min: fs.xs, max: fs.rg, viewportUnit: 'vw' },
    fontWeight: 'bold',
    marginTop: 'auto',
    marginBottom: '0.25rem',

    '&:is(:hover, :focus-visible)': {
      color: '$green300',
    },
  },
})

/* 
  Component
*/
interface ItemControlProps {
  id: string
  quantity: number
}

export function ItemControl({ id, quantity }: ItemControlProps) {
  const { incrementItem, decrementItem } = useCart()

  function handleIncrement() {
    incrementItem(id)
  }

  function handleDecrement() {
    decrementItem(id)
  }

  return (
    <S_ItemControl>
      <button onClick={handleDecrement}>
        {quantity > 1 ? (
          <Minus size={16} weight="bold" />
        ) : (
          <TrashSimple size={16} weight="bold" />
        )}
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrement}>
        <Plus size={16} weight="bold" />
      </button>
    </S_ItemControl>
  )
}
