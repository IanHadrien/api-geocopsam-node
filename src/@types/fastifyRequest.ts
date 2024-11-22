import { FastifyRequest } from 'fastify'

export interface PaginationQuery extends FastifyRequest {
  query: {
    page: string
    pageSize: string
    userId?: string
    cultivationId?: string
  }
}
