import { PaginationType } from '@/@types/paginate'
import { MappedArea, Prisma } from '@prisma/client'

export interface MappedAreasRepository {
  getAll: (page: number, pageSize: number) => Promise<PaginationType<MappedArea>>
  findById: (id: string) => Promise<MappedArea | null>
  create: (data: Prisma.MappedAreaCreateInput) => Promise<MappedArea>
  update: (id: string, data: Prisma.MappedAreaUpdateInput) => Promise<MappedArea>
  delete: (id: string) => Promise<MappedArea>
}
