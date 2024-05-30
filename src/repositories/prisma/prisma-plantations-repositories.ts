import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PlantationsRepository } from '../interfaces/plantation-repository'

export class PrismaPlantationsRepository implements PlantationsRepository {
  async getAll () {
    const plantations = await prisma.plantation.findMany({
      include: {
        cultivation: true,
        mappedArea: true,
        user: true
      }
    })

    return plantations
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
