export type PaginatedEntity<T> = {
  pagination: Pagination
  items: T[]
}
export interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type PaginationRequest<T> = Partial<Pick<Pagination, 'currentPage' | 'itemsPerPage'>> & T

// export type PaginationRequest<T> = {
//   currentPage: Pagination['currentPage']
//   itemsPerPage: Pagination['itemsPerPage']
// } & T
