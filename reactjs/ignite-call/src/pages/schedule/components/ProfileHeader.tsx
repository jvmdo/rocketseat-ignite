import { Avatar, Heading, Text, styled } from '@ignite-ui/react'

/* 
  Styles
*/
const S_ProfileHeader = styled('header', {
  display: 'grid',
  gap: '$2',
  placeItems: 'center',
  textAlign: 'center',
})

/* 
  Component
*/
interface ProfileProps {
  name: string
  bio: string | null
  avatarUrl: string | null
}

export function ProfileHeader({ name, bio, avatarUrl }: ProfileProps) {
  return (
    <S_ProfileHeader>
      <Avatar src={avatarUrl ?? undefined} />
      <Heading as="h1">{name}</Heading>
      <Text size="sm">{bio}</Text>
    </S_ProfileHeader>
  )
}
