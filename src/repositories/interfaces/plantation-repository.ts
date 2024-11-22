import { Plantation, Prisma } from '@prisma/client'

interface PaginatedResult<T> {
  data: T[]
  totalCount: number
}

export interface PlantationsRepository {
  getAll: (page?: number, pageSize?: number, userId?: string | null, cultivationId?: string | null) => Promise<PaginatedResult<Plantation>>
  findById: (id: string) => Promise<Plantation | null>
  create: (data: Prisma.PlantationCreateInput) => Promise<Plantation>
  update: (id: string, data: Prisma.PlantationUpdateInput) => Promise<Plantation>
  delete: (id: string) => Promise<Plantation>
}
