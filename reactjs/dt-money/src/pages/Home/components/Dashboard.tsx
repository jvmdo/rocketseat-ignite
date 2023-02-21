import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { ReactNode } from 'react'
import styled, { CSSProperties, useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
import { breakpoint, ContentContainer } from '../../../styles/global'
import { currencyFormatter, dateFormatter } from '../../../utils/formatter'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useMediaQuery } from 'react-responsive'
import { Transaction } from './Transactions'

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
  firstModifiedAt?: Date
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
          color={props.firstModifiedAt ? theme['gray-300'] : theme['gray-500']}
        >
          {props.firstModifiedAt
            ? `From ${props.firstModifiedAt.toLocaleDateString(
                'en-US',
              )} to ${props.lastModifiedAt.toLocaleDateString('en-US')}`
            : `Last modified at ${dateFormatter(props.lastModifiedAt)}`}
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

interface DashboardProps {
  data: Transaction[]
}

export function Dashboard({ data }: DashboardProps) {
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

  const incomes = data.filter(({ amount }) => amount > 0)
  const outcomes = data.filter(({ amount }) => amount < 0)

  const incomeAmount = incomes.reduce((acc, { amount }) => acc + amount, 0)
  const outcomeAmount = outcomes.reduce((acc, { amount }) => acc + amount, 0)
  const totalAmount = incomeAmount + outcomeAmount

  const lastIncomeDate = Math.max(...incomes.map(({ date }) => date))
  const lastOutcomeDate = Math.max(...outcomes.map(({ date }) => date))
  const theLastOfUs = Math.max(lastIncomeDate, lastOutcomeDate)
  const theFirstOfUs = Math.min(...data.map(({ date }) => date))

  return (
    <ContentContainer style={{ overflow: 'clip' }}>
      <StyledDashboard
        ref={isMobile ? ref : null}
        className="keen-slider"
        style={{ overflow: 'visible' }}
      >
        <DashboardCard
          title="Income"
          amount={incomeAmount}
          lastModifiedAt={new Date(lastIncomeDate)}
          iconColor={theme['green-300']}
        >
          <ArrowCircleUp />
        </DashboardCard>
        <DashboardCard
          title="Outcome"
          amount={outcomeAmount}
          lastModifiedAt={new Date(lastOutcomeDate)}
          iconColor={theme['red-300']}
        >
          <ArrowCircleDown />
        </DashboardCard>
        <DashboardCard
          title="Total"
          amount={totalAmount}
          firstModifiedAt={new Date(theFirstOfUs)}
          lastModifiedAt={new Date(theLastOfUs)}
          color={totalAmount > 0 ? theme['green-700'] : theme['red-700']}
        >
          <CurrencyDollar />
        </DashboardCard>
      </StyledDashboard>
    </ContentContainer>
  )
}
