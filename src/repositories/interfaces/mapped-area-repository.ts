import { MappedArea, Prisma } from '@prisma/client'

export interface MappedAreasRepository {
  getAll: () => Promise<MappedArea[]>
  create: (data: Prisma.MappedAreaCreateInput) => Promise<MappedArea>
}
