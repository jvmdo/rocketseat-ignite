import {
  ArrowSquareOut,
  Buildings,
  GithubLogo,
  UsersThree,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { FluidText } from '../../../components/FluidText'
import { LinkIcon } from '../../../components/LinkIcon'
import { getGitHubUser, ProfileUserData } from '../../../services/github'
import { breakpoint } from '../../../styles/global'

const SProfile = styled.section`
  background-color: ${(p) => p.theme.profile};
  border-radius: ${(p) => p.theme.br};
  margin-top: calc(-1 * clamp(3.25rem, 1.579rem + 7.13vw, 6rem));
  padding: clamp(1rem, 0.392rem + 2.59vw, 2rem);

  display: grid;
  place-items: center;
  grid-template-areas:
    'picture'
    'about'
    'footer';
  row-gap: 1rem;

  // Set position to avoid issues with Header overlapping
  position: relative;

  @media (min-width: ${breakpoint.md}) {
    grid-template-areas:
      'picture about'
      'picture about'
      'footer footer';
    column-gap: 1.5rem;
  }

  @media (min-width: ${breakpoint.lg}) {
    grid-template-areas:
      'picture about'
      'picture about'
      'picture footer';
    column-gap: 2rem;
  }
`

const Picture = styled.img`
  grid-area: picture;
  border-radius: ${(p) => p.theme.br};
  width: 9.25rem;
`

const About = styled.div`
  grid-area: about;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .name {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem clamp(1rem, 0.696rem + 1.3vw, 1.5rem);
  margin-top: 0.5rem;

  span {
    color: ${(p) => p.theme.subtitle};
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;

    svg {
      color: ${(p) => p.theme.label};
    }
  }

  @media (min-width: ${breakpoint.md}) {
    justify-self: flex-end;
    margin-top: unset;
  }

  @media (min-width: ${breakpoint.lg}) {
    justify-self: flex-start;
    margin-top: 0.5rem;
  }
`

export function Profile() {
  const theme = useTheme()
  const [profileData, setProfileData] = useState<ProfileUserData>(null)

  useEffect(() => {
    async function getProfileData() {
      const data = await getGitHubUser()
      if (data) {
        setProfileData(data)
      }
    }
    getProfileData()
  }, [])

  return profileData ? (
    <SProfile>
      <Picture src={profileData.avatarUrl} alt="" />
      <About>
        <div className="name">
          <FluidText
            min={theme['fs-xl']}
            max={theme['fs-xxl']}
            color={theme.title}
            bold
            tag="h1"
          >
            {profileData.name}
          </FluidText>
          <LinkIcon href={profileData.profileUrl}>
            GitHub <ArrowSquareOut size={14} weight="bold" />
          </LinkIcon>
        </div>
        <div className="desc">
          <FluidText
            min={theme['fs-sm']}
            max={theme.fs}
            color={theme.text}
            tag="p"
          >
            {profileData.bio ??
              'Still working on my bio, but my code speaks for itself! 🚀'}
          </FluidText>
        </div>
      </About>
      <Footer>
        <span>
          <GithubLogo size={16} weight="fill" />
          <FluidText min={theme['fs-sm']} max={theme.fs}>
            {profileData.username}
          </FluidText>
        </span>
        {profileData.company && (
          <span>
            <Buildings size={16} weight="fill" />
            <FluidText min={theme['fs-sm']} max={theme.fs}>
              {profileData.company}
            </FluidText>
          </span>
        )}
        <span>
          <UsersThree size={16} weight="fill" />
          <FluidText min={theme['fs-sm']} max={theme.fs}>
            {profileData.followers + ' followers'}
          </FluidText>
        </span>
      </Footer>
    </SProfile>
  ) : (
    <SProfile>
      <FluidText
        min={theme['fs-xl']}
        max={theme['fs-xxl']}
        color={theme.blue}
        bold
      >
        Loading profile data...
      </FluidText>
    </SProfile>
  )
}
