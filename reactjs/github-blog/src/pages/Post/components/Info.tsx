import { formatDistance } from 'date-fns'
import {
  ArrowSquareOut,
  Calendar,
  CaretLeft,
  ChatCircle,
  GithubLogo,
} from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
import { LinkIcon } from '../../../components/LinkIcon'

const SInfo = styled.section`
  background-color: ${(p) => p.theme.profile};
  border-radius: ${(p) => p.theme.br};
  margin-top: calc(-1 * clamp(3.25rem, 1.579rem + 7.13vw, 6rem));
  padding: clamp(1rem, 0.392rem + 2.59vw, 2rem);

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;

  // Set position to avoid issues with Header overlapping
  position: relative;
`

const Navigation = styled.nav`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

const Footer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem clamp(1rem, 0.696rem + 1.3vw, 1.5rem);

  span {
    color: ${(p) => p.theme.span};
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;

    svg {
      color: ${(p) => p.theme.label};
    }
  }
`

interface InfoProps {
  title: string
  username: string
  createdAt: string
  comments: number
  issueUrl: string
}

export function Info(props: InfoProps) {
  const theme = useTheme()
  const navigator = useNavigate()

  return (
    <SInfo>
      <Navigation>
        {/* TODO: Change to <Link> if the scroll behavior remains the same */}
        <LinkIcon asText onClick={() => navigator(-1)}>
          <CaretLeft size={14} weight="bold" />
          Back
        </LinkIcon>
        <LinkIcon href={props.issueUrl} target="_blank">
          See on GitHub
          <ArrowSquareOut size={14} weight="bold" />
        </LinkIcon>
      </Navigation>
      <FluidText
        min={theme['fs-xl']}
        max={theme['fs-xxl']}
        color={theme.title}
        bold
        tag="h1"
      >
        {props.title}
      </FluidText>
      <Footer>
        <span>
          <GithubLogo size={16} weight="fill" />
          <FluidText min={theme['fs-sm']} max={theme.fs}>
            {props.username}
          </FluidText>
        </span>
        <span>
          <Calendar size={16} weight="fill" />
          <FluidText min={theme['fs-sm']} max={theme.fs}>
            {formatDistance(new Date(props.createdAt), new Date(), {
              addSuffix: true,
            })}
          </FluidText>
        </span>
        <span>
          <ChatCircle size={16} weight="fill" />
          <FluidText min={theme['fs-sm']} max={theme.fs}>
            {props.comments + ' comments'}
          </FluidText>
        </span>
      </Footer>
    </SInfo>
  )
}
