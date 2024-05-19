import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CultivationsRepository } from '../interfaces/cultivations-repository'

export class PrismaCultivationsRepository implements CultivationsRepository {
  async findById (id: string) {
    const cultivation = await prisma.cultivation.findUnique({
      where: {
        id
      }
    })

    return cultivation
  }

  async getAll () {
    const cultivation = await prisma.cultivation.findMany()

    return cultivation
  }

  async create (data: Prisma.CultivationCreateInput) {
    const cultivation = await prisma.cultivation.create({
      data
    })

    return cultivation
  }

  async update (id: string, data: Prisma.CultivationUpdateInput) {
    const cultivation = await prisma.cultivation.update({
      where: { id },
      data
    })

    return cultivation
  }

  async delete (id: string) {
    const cultivation = await prisma.cultivation.delete({
      where: { id }
    })

    return cultivation
  }
}
