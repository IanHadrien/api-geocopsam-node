import { PrismaMapRepository } from '@/repositories/prisma/prisma-map-repositories'
import { GetAllMapUseCase } from '@/use-cases/map/getAll-map'
import { FastifyReply } from 'fastify'

export async function GetAllMap (res: FastifyReply) {
  const prismaMapRepository = new PrismaMapRepository()

  try {
    const useCase = new GetAllMapUseCase(prismaMapRepository)
    const maps = useCase.execute()

    return maps
  } catch (err) {
    if (err) {
      return res.status(409).send({ message: err })
    }
    console.error(err)

    return res.status(500).send()
  }
}
