import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { ReactNode } from 'react'
import styled, { CSSProperties, useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
import { breakpoint, ContentContainer } from '../../../styles/global'
import { currencyFormatter, dateFormatter } from '../../../utils/formatter'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useMediaQuery } from 'react-responsive'

const StyledDashboardCard = styled.div`
  background-color: var(--color, ${(p) => p.theme['gray-600']});
  border-radius: ${(p) => p.theme.br};
  width: clamp(17.5rem, 14.765rem + 11.67vw, 22rem);
  padding: 1.5rem 1.5rem 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  h2 {
    color: ${(p) => p.theme['gray-300']};
    font-size: ${(p) => p.theme.fs};
    font-weight: normal;
  }

  svg {
    color: var(--iconColor, ${(p) => p.theme.white});
    font-size: ${(p) => p.theme['fs-cash']};
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }
`

interface DashboardCardProps {
  title: string
  amount: number
  lastModifiedAt: Date
  children: ReactNode
  iconColor?: string
  color?: string
}

function DashboardCard({ iconColor, color, ...props }: DashboardCardProps) {
  const theme = useTheme()
  const biggerThanKiss = useMediaQuery({
    query: `(min-width: ${breakpoint.lg})`,
  })

  return (
    <StyledDashboardCard
      className="keen-slider__slide"
      style={{ '--color': color, '--iconColor': iconColor } as CSSProperties}
    >
      <div className="card-header">
        <h2>{props.title}</h2>
        {props.children}
      </div>
      <FluidText min={theme['fs-xxl']} max={theme['fs-cash']} bold>
        {currencyFormatter(props.amount)}
      </FluidText>
      {!biggerThanKiss && (
        <FluidText
          min={theme['fs-sm']}
          max={theme.fs}
          color={theme['gray-500']}
        >
          Last modified at {dateFormatter(props.lastModifiedAt)}
        </FluidText>
      )}
    </StyledDashboardCard>
  )
}

const StyledDashboard = styled.section`
  margin-block: -4rem 2rem;

  @media (min-width: ${breakpoint.lg}) {
    margin-bottom: 4rem;

    & > *:not(:last-child) {
      margin-right: 2rem;
    }
  }
`

export function Dashboard() {
  // TODO: Get the amounts $ from somewhere
  // TODO: The total card color depends on the positive or negative value
  // TODO: Get the last modified dates and the range from most earlier to last

  const theme = useTheme()
  const isMobile = !useMediaQuery({
    query: `(min-width: ${breakpoint.lg})`,
  })
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.2, spacing: 8 },
    breakpoints: {
      [`(min-width: ${breakpoint.xs})`]: {
        slides: { perView: 1.2, spacing: 16 },
      },
      [`(min-width: ${breakpoint.sm})`]: {
        slides: { perView: 1.6, spacing: 16 },
      },
      [`(min-width: ${breakpoint.md})`]: {
        slides: { perView: 2.4, spacing: 16 },
      },
    },
  })

  return (
    <ContentContainer style={{ overflow: 'clip' }}>
      <StyledDashboard
        ref={isMobile ? ref : null}
        className="keen-slider"
        style={{ overflow: 'visible' }}
      >
        <DashboardCard
          title="Income"
          amount={12309450}
          lastModifiedAt={new Date()}
          iconColor={theme['green-300']}
        >
          <ArrowCircleUp />
        </DashboardCard>
        <DashboardCard
          title="Outcome"
          amount={56732}
          lastModifiedAt={new Date()}
          iconColor={theme['red-300']}
        >
          <ArrowCircleDown />
        </DashboardCard>
        <DashboardCard
          title="Total"
          amount={7852029}
          lastModifiedAt={new Date()}
          color={theme['green-700']}
        >
          <CurrencyDollar />
        </DashboardCard>
      </StyledDashboard>
    </ContentContainer>
  )
}
