import { PrismaPlantationsRepository } from '@/repositories/prisma/prisma-plantations-repositories'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreatePlantationUseCase } from '@/use-cases/plantations/create-plantation'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreatePlantation (req: FastifyRequest, res: FastifyReply) {
  const createPlantationBodySchema = z.object({
    name: z.string().min(3, 'O campo nome deve ter mais de 3 caracteres'),
    plantingDate: z.coerce.date({
      required_error: 'A data é obrigatoria',
      invalid_type_error: 'Data inválida'
    }),
    previousCulture: z.string().min(3, 'O campo deve ter mais de 3 caracteres'),
    mappedAreaId: z.string(),
    cultivationId: z.string(),
    userId: z.string()
  })

  const {
    name,
    plantingDate,
    previousCulture,
    cultivationId,
    mappedAreaId,
    userId
  } = createPlantationBodySchema.parse(req.body)

  try {
    const prismaPlantationsRepository = new PrismaPlantationsRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const createUseCase = new CreatePlantationUseCase(prismaPlantationsRepository, prismaUsersRepository)

    await createUseCase.execute({
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
