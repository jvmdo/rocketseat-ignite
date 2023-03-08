import styled, { useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
import { formatDistanceToNow } from 'date-fns'

const SPostCard = styled.div`
  background-color: ${(p) => p.theme.post};
  border-radius: ${(p) => p.theme.br};
  outline: 2px solid transparent;
  padding: 2rem;

  // The card is wrapped in a <Link> element
  a:focus-visible > &,
  &:is(:hover, :focus-visible) {
    outline-color: ${(p) => p.theme.label};
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
  createdAt: string
  body: string
  number: number
}

export function PostCard({ title, body, createdAt, number }: PostCardProps) {
  const theme = useTheme()

  return (
    <SPostCard>
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
          {formatDistanceToNow(new Date(createdAt), {
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
          {bodyFormatter(body)}
        </FluidText>
      </div>
    </SPostCard>
  )
}

function bodyFormatter(text: string) {
  return (
    text
      .match(/\r\n\r\n(.*)/gi)
      ?.map((match) =>
        match
          .replace(/\s{2,}/g, '')
          .replace(/[#*>`]*/g, '')
          .replace(/~~~(.*)(:~~~)?/is, ''),
      )
      .join('\n')
      .slice(0, 181) + '...' ?? 'Formatting error'
  )
}
