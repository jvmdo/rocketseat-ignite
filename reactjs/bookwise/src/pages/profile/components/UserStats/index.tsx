import Image from 'next/image'
import { S_UserStats, StatsBody, StatsHead, StatsSeparator } from './styles'
import { format } from 'date-fns'
import {
  BookOpen,
  BookmarkSimple,
  Books,
  UserList,
} from '@phosphor-icons/react'

interface UserStatsProps {
  image?: string
  name?: string
  since?: string
  pagesRead?: number
  reviewedBooks?: number
  authorsRead?: number
  favoriteCategory?: string
  reviews?: {}
}

export function UserStats({
  image = 'https://picsum.photos/200',
  name = 'Cristofer Rosser',
  since = '2022-05-29T23:23:23',
  pagesRead = 23,
  reviewedBooks = 12,
  authorsRead = 10,
  favoriteCategory = 'Adulto',
}: UserStatsProps) {
  return (
    <S_UserStats className="user-stats">
      <StatsHead>
        <Image src={image} width={72} height={72} alt="" />
        <hgroup>
          <h2>{name}</h2>
          <p>membro desde {format(new Date(since), 'yyyy')}</p>
        </hgroup>
      </StatsHead>
      <StatsSeparator decorative asChild>
        <Image src="/separator-stick.svg" width={32} height={4} alt="" />
      </StatsSeparator>
      <StatsBody>
        <li>
          <BookOpen />
          <strong>{pagesRead}</strong>
          <p>Páginas lidas</p>
        </li>
        <li>
          <Books />
          <strong>{reviewedBooks}</strong>
          <p>Livros avaliados</p>
        </li>
        <li>
          <UserList />
          <strong>{authorsRead}</strong>
          <p>Autores lidos</p>
        </li>
        <li>
          <BookmarkSimple />
          <strong>{favoriteCategory}</strong>
          <p>Categoria mais lida</p>
        </li>
      </StatsBody>
    </S_UserStats>
  )
}

UserStats.toString = () => '.user-stats'
