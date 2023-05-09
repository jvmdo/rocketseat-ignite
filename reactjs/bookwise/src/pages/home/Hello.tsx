import { styled } from '@/styles/stitches.config'
import Image from 'next/image'
import { ComponentProps } from 'react'

const S_MyComponent = styled('main', {
  backgroundImage: '$gradient-horizontal',
  color: '$gray700',
  padding: '$4',
})

export interface MyComponentProps extends ComponentProps<typeof S_MyComponent> {
  bookName: string
  bookCover: string
  bookSummary: string
  userName: string
  updatedAt: string
}

export function MyComponent({
  bookName,
  bookCover,
  bookSummary,
  userName,
  updatedAt,
}: MyComponentProps) {
  return (
    <S_MyComponent>
      <Image src={bookCover} alt="Foda" width={216} height={304} />
      <hgroup>
        <em>Last Read Book</em>
        <h1>{bookName}</h1>
        <p>Read by: {userName}</p>
        <time dateTime={updatedAt}>
          At: {new Date(updatedAt).toLocaleString()}
        </time>
      </hgroup>
      <p>{bookSummary}</p>
    </S_MyComponent>
  )
}
