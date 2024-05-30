import { Plantation, Prisma } from '@prisma/client'

export interface PlantationsRepository {
  getAll: () => Promise<Plantation[]>
  findById: (id: string) => Promise<Plantation | null>
  create: (data: Prisma.PlantationCreateInput) => Promise<Plantation>
  update: (id: string, data: Prisma.PlantationUpdateInput) => Promise<Plantation>
  delete: (id: string) => Promise<Plantation>
}
