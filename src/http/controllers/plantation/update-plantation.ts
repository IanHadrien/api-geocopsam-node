import { PrismaPlantationsRepository } from '@/repositories/prisma/prisma-plantations-repositories'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdatePlantationUseCase } from '@/use-cases/plantations/update-plantation'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdatePlantation (req: FastifyRequest, res: FastifyReply) {
  const updatePlantationBodySchema = z.object({
    plantationId: z.string(),
    name: z.string().min(3, 'O campo nome deve ter mais de 3 caracteres').optional(),
    plantingDate: z.coerce.date({
      required_error: 'A data é obrigatoria',
      invalid_type_error: 'Data inválida'
    }).optional(),
    previousCulture: z.string().min(3, 'O campo deve ter mais de 3 caracteres').optional(),
    mappedAreaId: z.string().optional(),
    cultivationId: z.string().optional(),
    userId: z.string().optional()
  })

  const {
    plantationId,
    name,
    plantingDate,
    previousCulture,
    cultivationId,
    mappedAreaId,
    userId
  } = updatePlantationBodySchema.parse(req.body)

  try {
    const prismaPlantationsRepository = new PrismaPlantationsRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const createUseCase = new UpdatePlantationUseCase(prismaPlantationsRepository, prismaUsersRepository)

    await createUseCase.execute({
      plantationId,
      name,
      plantingDate,
      previousCulture,
      cultivationId,
      mappedAreaId,
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
