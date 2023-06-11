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
import { EUser } from '@/@types/entities'

interface UserStatsProps {
  user: EUser
}

export function UserStats({ user }: UserStatsProps) {
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
          {user.createdAt && (
            <p>membro desde {format(new Date(user.createdAt), 'yyyy')}</p>
          )}
        </hgroup>
      </StatsHead>
      <StatsSeparator decorative asChild>
        <Image src="/separator-stick.svg" width={32} height={4} alt="" />
      </StatsSeparator>
      <StatsBody>
        <li>
          <BookOpen />
          <strong>{user.totalReadPages}</strong>
          <p>Páginas lidas</p>
        </li>
        <li>
          <Books />
          <strong>{user.totalReviews}</strong>
          <p>Livros avaliados</p>
        </li>
        <li>
          <UserList />
          <strong>{user.totalReadAuthors}</strong>
          <p>Autores lidos</p>
        </li>
        <li>
          <BookmarkSimple />
          <strong>{user.favoriteCategory ?? '-'}</strong>
          <p>Categoria mais lida</p>
        </li>
      </StatsBody>
    </S_UserStats>
  )
}

UserStats.toString = () => '.user-stats'
