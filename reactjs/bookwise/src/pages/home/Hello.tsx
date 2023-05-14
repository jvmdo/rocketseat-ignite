import { styled } from '@/styles/stitches.config'
import { signIn, signOut, useSession } from 'next-auth/react'
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
  const { status } = useSession()

  console.warn({ status })

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
      {status === 'authenticated' ? (
        <div>
          <p>This paragraph is displayed for signed in users only 😲🤯</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={() => signIn('google')}>Sign In with Google</button>
          <button onClick={() => signIn('github')}>Sign In with GitHub</button>
        </div>
      )}
    </S_MyComponent>
  )
}
