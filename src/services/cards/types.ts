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

export type CreateCardArgs = {
  id: string
  question: string
  answer: string
  questionImg?: File
  answerImg?: File
  questionVideo?: string
  answerVideo?: string
}
// export type UpdateDeckArgs = {
//   name: string
//   isPrivate?: boolean
// } & { id: string }
