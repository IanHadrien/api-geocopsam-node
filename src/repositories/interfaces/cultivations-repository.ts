import { Cultivation, Prisma } from '@prisma/client'

export interface CultivationsRepository {
  // findById: (id: string) => Promise<User | null>
  create: (data: Prisma.CultivationCreateInput) => Promise<Cultivation>
}
