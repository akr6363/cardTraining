import { PaginatedEntity, PaginationRequest } from '@/services/types.ts'

export type GetDecksArgs = PaginationRequest<{
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: Author['id']
  orderBy?: string
}>

export type DecksRes = PaginatedEntity<Deck> & {
  maxCardsCount: number
}

export type Author = {
  id: string
  name: string
}
export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type CreateDeckArgs = {
  name: string
  isPrivate?: boolean
}
