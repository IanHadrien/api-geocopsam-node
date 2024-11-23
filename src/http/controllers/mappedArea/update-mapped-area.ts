import { PrismaMappedAreaRepository } from '@/repositories/prisma/prisma-mapped-area-repositories'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { NotFoundError } from '@/use-cases/errors/not-found-error'
import { UpdateMappedAreaUseCase } from '@/use-cases/mapped-area/update-mapped-area'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdateMappedArea (req: FastifyRequest, res: FastifyReply) {
  const updateMappedAreaBodySchema = z.object({
    mappedAreaId: z.string(),
    name: z.string().min(3, 'O nome deve ter mais de 3 caracteres').optional(),
    geospatialData: z.string().optional(),
    totalArea: z.string().optional(),
    centerPont: z.string().optional(),
    userId: z.string().optional()
  })

  const {
    mappedAreaId,
    name,
    geospatialData,
    totalArea,
    centerPont,
    userId
  } = updateMappedAreaBodySchema.parse(req.body)

  try {
    const prismaMappedAreaRepository = new PrismaMappedAreaRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const updateMappedAreaUseCase = new UpdateMappedAreaUseCase(prismaMappedAreaRepository, prismaUsersRepository)

    await updateMappedAreaUseCase.execute({
      mappedAreaId,
      name,
      geospatialData,
      totalArea,
      centerPont,
      userId
    })
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(409).send({ message: err.message })
    }

    return res.status(409).send({ message: err })
  }

  return res.status(200).send()
}
