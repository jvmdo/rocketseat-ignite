import { S_ReviewForm } from './styles'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Check, Star, X } from '@phosphor-icons/react'
import { CSSProperties, RefObject, useState } from 'react'

const { theme } = config

interface ReviewFormProps {
  triggerRef: RefObject<HTMLButtonElement>
}

export function ReviewForm({ triggerRef }: ReviewFormProps) {
  const [value, setValue] = useState('')
  // if index === 0 && rate > 0, reset

  function handleCollapseClose() {
    triggerRef.current?.click()
  }

  return (
    <S_ReviewForm>
      <header>
        <div className="user-info">
          <Image src="" width={40} height={40} alt="" />
          <h4>Cristofer Rosser</h4>
        </div>
        <Rating
          initialValue={0}
          transition
          allowFraction
          disableFillHover
          allowHover={false}
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        ></Rating>
      </header>
      <div className="body">
        <div
          className="textarea-wrapper"
          style={
            {
              '--chars-count': `${value.length}`,
            } as CSSProperties
          }
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Escreva sua avaliação"
            maxLength={450}
          />
        </div>
        <div className="buttons-wrapper">
          <button type="button" onClick={handleCollapseClose}>
            <X />
          </button>
          <button>
            <Check />
          </button>
        </div>
      </div>
    </S_ReviewForm>
  )
}
