import { PaginationType } from '@/@types/paginate'
import { Cultivation, Prisma } from '@prisma/client'

export interface CultivationsRepository {
  findById: (id: string) => Promise<Cultivation | null>
  getAll: (page: number, pageSize: number) => Promise<PaginationType<Cultivation>>
  create: (data: Prisma.CultivationCreateInput) => Promise<Cultivation>
  update: (id: string, data: Prisma.CultivationUpdateInput) => Promise<Cultivation>
  delete: (id: string) => Promise<Cultivation>
}
