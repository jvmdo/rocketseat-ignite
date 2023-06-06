import Image from 'next/image'
import { S_UserStats, StatsBody, StatsHead, StatsSeparator } from './styles'
import { format } from 'date-fns'
import {
  BookOpen,
  BookmarkSimple,
  Books,
  UserList,
} from '@phosphor-icons/react'
import { formatInitials } from '@/utils/format-initials'

// TODO: remove emails
export type UserData = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  createdAt: Date
}

export type UserWithStatsData = {
  favoriteCategory: string | null
  totalReadAuthors: number
  totalReadPages: number
  totalReviews: number
  user: UserData
}

interface UserStatsProps {
  user: UserWithStatsData['user']
  stats: Omit<UserWithStatsData, 'user'>
}

export function UserStats({ user, stats }: UserStatsProps) {
  return (
    <S_UserStats className="user-stats">
      <StatsHead>
        <Image
          src={user.image ?? ''}
          width={72}
          height={72}
          alt={formatInitials(user.name)}
        />
        <hgroup>
          <h2>{user.name}</h2>
          <p>membro desde {format(new Date(user.createdAt), 'yyyy')}</p>
        </hgroup>
      </StatsHead>
      <StatsSeparator decorative asChild>
        <Image src="/separator-stick.svg" width={32} height={4} alt="" />
      </StatsSeparator>
      <StatsBody>
        <li>
          <BookOpen />
          <strong>{stats.totalReadPages}</strong>
          <p>Páginas lidas</p>
        </li>
        <li>
          <Books />
          <strong>{stats.totalReviews}</strong>
          <p>Livros avaliados</p>
        </li>
        <li>
          <UserList />
          <strong>{stats.totalReadAuthors}</strong>
          <p>Autores lidos</p>
        </li>
        <li>
          <BookmarkSimple />
          <strong>{stats.favoriteCategory}</strong>
          <p>Categoria mais lida</p>
        </li>
      </StatsBody>
    </S_UserStats>
  )
}

UserStats.toString = () => '.user-stats'
