import { PaginationQuery } from '@/@types/fastifyRequest'
import { PrismaMappedAreaRepository } from '@/repositories/prisma/prisma-mapped-area-repositories'
import { GetMappedAreaUseCase } from '@/use-cases/mapped-area/get-mapped-area'
import { FastifyReply } from 'fastify'

export async function GetMappedArea (req: PaginationQuery, res: FastifyReply) {
  const prismaMappedAreaRepository = new PrismaMappedAreaRepository()

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10

  try {
    const mappedAreaUseCase = new GetMappedAreaUseCase(prismaMappedAreaRepository)
    const mappedAreas = mappedAreaUseCase.execute(page, pageSize)

    return mappedAreas
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error(err)

    return res.status(500).send()
  }
}
