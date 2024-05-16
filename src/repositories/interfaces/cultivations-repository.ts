import { Cultivation, Prisma } from '@prisma/client'

export interface CultivationsRepository {
  getAll: () => Promise<Cultivation[]>
  create: (data: Prisma.CultivationCreateInput) => Promise<Cultivation>
}
