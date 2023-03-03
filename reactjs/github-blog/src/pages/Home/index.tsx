import { ContentContainer } from '../../styles/global'
import { Profile } from './components/Profile'
import { Publications } from './components/Publications'

export function Home() {
  return (
    <main>
      <ContentContainer>
        <Profile />
        <Publications />
      </ContentContainer>
    </main>
  )
}
