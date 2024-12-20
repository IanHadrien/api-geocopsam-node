import { PrismaMapRepository } from '@/repositories/prisma/prisma-map-repositories'
import { PrismaMappedAreaRepository } from '@/repositories/prisma/prisma-mapped-area-repositories'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateMappedAreaUseCase } from '@/use-cases/mapped-area/create-mapped-area'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateMappedArea (req: FastifyRequest, res: FastifyReply) {
  const createMappedAreaBodySchema = z.object({
    name: z.string().min(3, 'O campo nome deve ter mais de 3 caracteres'),
    geospatialData: z.string().min(3, 'O campo dados geográficos deve ter mais de 3 caracteres'),
    totalArea: z.string(),
    centerPont: z.string().optional(),
    userId: z.string()
  })

  const {
    name,
    geospatialData,
    totalArea,
    centerPont,
    userId
  } = createMappedAreaBodySchema.parse(req.body)

  try {
    const prismaMappedAreaRepository = new PrismaMappedAreaRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaMapRepository = new PrismaMapRepository()
    const createMappedAreaUseCase = new CreateMappedAreaUseCase(prismaMappedAreaRepository, prismaMapRepository, prismaUsersRepository)

    await createMappedAreaUseCase.execute({
      name,
      geospatialData,
      totalArea,
      centerPont,
      userId
    })
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }

    return res.status(409).send({ message: err })
  }

  return res.status(200).send()
}
