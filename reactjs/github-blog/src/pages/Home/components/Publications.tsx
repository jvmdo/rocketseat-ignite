import { useForm } from 'react-hook-form'
import styled, { useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 30ch), 1fr));
  gap: clamp(1rem, 0.392rem + 2.59vw, 2rem);
  margin-top: 2rem;
`

export function Publications() {
  const theme = useTheme()
  const { register, handleSubmit, reset } = useForm()

  // Fetch data in useEffect()

  function searchPublications(query: any) {
    // ? What is the [query]'s data type format?
    console.log(query)
    reset()
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
          {'6 posts' ?? 'Fetching posts...'}
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
        {/* content ?? loading */}
        <PostCard
          title="JavaScript data types and data structures"
          body="Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in "
          date={new Date()}
        />
        <PostCard
          title="JavaScript data types and data structures"
          body="Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in "
          date={new Date()}
        />
        <PostCard
          title="JavaScript data types and data structures"
          body="Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in "
          date={new Date()}
        />
        <PostCard
          title="JavaScript data types and data structures"
          body="Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in "
          date={new Date()}
        />
        <PostCard
          title="JavaScript data types and data structures"
          body="Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in "
          date={new Date()}
        />
        <PostCard
          title="JavaScript data types and data structures"
          body="Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in "
          date={new Date()}
        />
      </CardGrid>
    </SPublications>
  )
}
