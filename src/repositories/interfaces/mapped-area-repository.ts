import { MappedArea, Prisma } from '@prisma/client'

export interface MappedAreasRepository {
  getAll: () => Promise<MappedArea[]>
  findById: (id: string) => Promise<MappedArea | null>
  create: (data: Prisma.MappedAreaCreateInput) => Promise<MappedArea>
  update: (id: string, data: Prisma.MappedAreaUpdateInput) => Promise<MappedArea>
  delete: (id: string) => Promise<MappedArea>
}
