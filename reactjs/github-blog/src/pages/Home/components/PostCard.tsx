import styled, { useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
import { formatDistance, subDays } from 'date-fns'
import { KeyboardEvent } from 'react'

const SPostCard = styled.div`
  background-color: ${(p) => p.theme.post};
  border-radius: ${(p) => p.theme.br};
  padding: 2rem;

  &:is(:hover, :focus-visible) {
    outline: 2px solid ${(p) => p.theme.label};
    cursor: pointer;
  }

  .title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;

    & > *:last-child {
      flex-shrink: 0;
      margin-top: 0.25rem;
    }
  }
`

interface PostCardProps {
  title: string
  body: string
  date: Date
  number?: number
}

export function PostCard({ title, body, date, number = 1 }: PostCardProps) {
  const theme = useTheme()

  // TODO: redirect to full post page onClick. Need issue number
  function navigateToPost() {
    console.log('Navigating...')
  }

  function handleKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      navigateToPost()
    }
  }

  return (
    <SPostCard onClick={navigateToPost} onKeyUp={handleKeyPress} tabIndex={0}>
      <div className="title">
        <FluidText
          min={theme['fs-lg']}
          max={theme['fs-xl']}
          color={theme.title}
          bold
          tag="h3"
        >
          {title}
        </FluidText>
        <FluidText min={theme['fs-xs']} max={theme['fs-sm']} color={theme.span}>
          {formatDistance(subDays(date, 1), new Date(), {
            addSuffix: true,
          })}
        </FluidText>
      </div>
      <div className="body">
        <FluidText
          min={theme['fs-sm']}
          max={theme.fs}
          color={theme.text}
          tag="p"
        >
          {body.slice(0, 181) + '...'}
        </FluidText>
      </div>
    </SPostCard>
  )
}
