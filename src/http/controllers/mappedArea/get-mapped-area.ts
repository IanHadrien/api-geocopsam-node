import { PaginationQuery } from '@/@types/fastifyRequest'
import { PrismaMappedAreaRepository } from '@/repositories/prisma/prisma-mapped-area-repositories'
import { GetMappedAreaUseCase } from '@/use-cases/mapped-area/get-mapped-area'
import { FastifyReply } from 'fastify'

export async function GetMappedArea (req: PaginationQuery, res: FastifyReply) {
  const prismaMappedAreaRepository = new PrismaMappedAreaRepository()

  const page = req.query.page ? parseInt(req.query.page) : undefined
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined

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
