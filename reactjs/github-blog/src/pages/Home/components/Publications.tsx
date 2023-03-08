import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
import { getIssueCardData, IssueCardData } from '../../../services/github'
import { breakpoint } from '../../../styles/global'
import { InputField } from './InputField'
import { PostCard } from './PostCard'

const SPublications = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: clamp(2.25rem, 0.882rem + 5.83vw, 4.5rem);
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CardGrid = styled.div`
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 30ch), 1fr));
  gap: clamp(1rem, 0.392rem + 2.59vw, 2rem); */
  margin-top: 2rem;

  // Use together with columns layout
  & > a {
    display: inline-block;
    break-inside: avoid;
  }

  & > a:not(:last-of-type) {
    margin-bottom: clamp(1rem, 0.392rem + 2.59vw, 2rem);
  }

  // Masonry-like 2 columns layout
  @media (min-width: ${breakpoint.md}) {
    columns: 2;
    column-gap: clamp(1rem, 0.392rem + 2.59vw, 2rem);
  }
`

export function Publications() {
  const theme = useTheme()
  const { register, handleSubmit } = useForm()
  const [cardData, setCardData] = useState<IssueCardData[]>([])
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getCardData() {
      setIsLoading(true)
      const data = await getIssueCardData(query)
      if (!ignore && data) {
        setCardData(data)
        setIsLoading(false)
      }
    }

    let ignore = false
    getCardData()

    return () => {
      ignore = true
    }
  }, [query])

  function searchPublications({ query }: any) {
    setQuery(query)
  }

  return (
    <SPublications>
      <Header>
        <FluidText
          min={theme.fs}
          max={theme['fs-lg']}
          color={theme.subtitle}
          bold
          tag="h2"
        >
          Publications
        </FluidText>
        <FluidText min={theme['fs-sm']} max={theme.fs} color={theme.span}>
          {!isLoading ? `${cardData.length} posts` : 'Fetching posts...'}
        </FluidText>
      </Header>
      <form onSubmit={handleSubmit(searchPublications)}>
        <InputField
          name="query"
          register={register}
          placeholder="Search for posts"
        />
      </form>
      <CardGrid>
        {!isLoading ? (
          cardData.map(({ title, createdAt, body, number }) => (
            <Link key={number} to={`posts/${number}`}>
              <PostCard
                title={title}
                body={body}
                createdAt={createdAt}
                number={number}
              />
            </Link>
          ))
        ) : (
          <FluidText
            min={theme['fs-xl']}
            max={theme['fs-xxl']}
            color={theme.blue}
            bold
          >
            Searching for issues...
          </FluidText>
        )}
      </CardGrid>
    </SPublications>
  )
}
