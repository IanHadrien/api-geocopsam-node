import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CultivationsRepository } from '../interfaces/cultivations-repository'

export class PrismaCultivationsRepository implements CultivationsRepository {
  async create (data: Prisma.CultivationCreateInput) {
    const cultivation = await prisma.cultivation.create({
      data
    })

    return cultivation
  }
}
