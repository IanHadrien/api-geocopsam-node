import { Plantation, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PlantationsRepository } from '../interfaces/plantation-repository'
import { PaginationType } from '@/@types/paginate'

export class PrismaPlantationsRepository implements PlantationsRepository {
  async getAll (page: number, pageSize: number): Promise<PaginationType<Plantation>> {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const [data, totalCount] = await Promise.all([
      prisma.plantation.findMany({
        skip,
        take,
        include: {
          user: true,
          cultivation: true,
          mappedArea: true
        }
      }),
      prisma.plantation.count()
    ])

    return { data, totalCount }
  }

  async findById (id: string) {
    const plantation = await prisma.plantation.findUnique({
      where: {
        id
      }
    })

    return plantation
  }

  async create (data: Prisma.PlantationCreateInput) {
    const plantation = await prisma.plantation.create({
      data
    })

    return plantation
  }

  async update (id: string, data: Prisma.PlantationUpdateInput) {
    const plantation = await prisma.plantation.update({
      where: { id },
      data
    })

    return plantation
  }

  async delete (id: string) {
    const Plantation = await prisma.plantation.delete({
      where: { id }
    })

    return Plantation
  }
}
