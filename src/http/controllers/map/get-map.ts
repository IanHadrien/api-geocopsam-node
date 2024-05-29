import { PrismaMapRepository } from '@/repositories/prisma/prisma-map-repositories'
import { GetMapUseCase } from '@/use-cases/map/get-map'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetMap (req: FastifyRequest, res: FastifyReply) {
  const mappedAreaId = req.params.id as string

  const prismaMapRepository = new PrismaMapRepository()

  try {
    const useCase = new GetMapUseCase(prismaMapRepository)
    const maps = useCase.execute(mappedAreaId)

    return maps
  } catch (err) {
    if (err) {
      return res.status(409).send({ message: err })
    }
    console.error(err)

    return res.status(500).send()
  }
}
