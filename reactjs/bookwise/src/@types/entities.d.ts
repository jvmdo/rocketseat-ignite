export type EBook = {
  id: string
  name: string
  author: string
  coverUrl: string
  summary: string
  categories: string[]
  totalPages: number
  totalReviews: number
  rating: number
  userHasRead?: boolean
  createdAt: Date
}

export type EUser = {
  id: string
  name: string | null
  image: string | null
  email?: string | null
  favoriteCategory?: string | null
  totalReadAuthors?: number
  totalReadPages?: number
  totalReviews?: number
  createdAt?: Date
}

export type EReview = {
  id: string
  rate: number
  description: string
  user: EUser
  book: EBook
  createdAt: Date
}

export type EBookReview = Omit<EReview, 'book'>

export type EUserReview = Omit<EReview, 'user'>

export type EReviewGroup = {
  interval?: string
  reviews?: EUserReview[]
}

export type ELastRead = {
  updatedAt: Date
  book: EBook
}
