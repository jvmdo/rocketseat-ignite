import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { FluidText } from '../../components/FluidText'
import ScrollToTop from '../../components/ScrollToTop'
import { getIssuePostData, IssuePostData } from '../../services/github'
import { ContentContainer } from '../../styles/global'
import { Body } from './components/Body'
import { Info } from './components/Info'

export function Post() {
  const { number } = useParams()
  const [postData, setPostData] = useState<IssuePostData>(null)
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()

  useEffect(() => {
    async function getPostData() {
      const data = await getIssuePostData(number!)
      if (data) {
        setPostData(data)
        setIsLoading(false)
      }
    }
    getPostData()
  }, [number])

  return (
    <main>
      <ScrollToTop>
        <ContentContainer>
          {!isLoading ? (
            <>
              <Info {...postData!} />
              <Body markdown={postData!.body} />{' '}
            </>
          ) : (
            <FluidText
              min={theme['fs-xl']}
              max={theme['fs-xxl']}
              color={theme.blue}
              bold
            >
              Loading issue...
            </FluidText>
          )}
        </ContentContainer>
      </ScrollToTop>
    </main>
  )
}
