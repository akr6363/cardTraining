import { PaginatedEntity, PaginationRequest } from '@/services/types.ts'

export type GetCardsArgs = PaginationRequest<{
  id: string
  question?: string
  answer?: string
  orderBy?: string
}>

export type CardRes = PaginatedEntity<Card>

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
}

// export type CreateDeckArgs = {
//   name: string
//   isPrivate?: boolean
// }
// export type UpdateDeckArgs = {
//   name: string
//   isPrivate?: boolean
// } & { id: string }
