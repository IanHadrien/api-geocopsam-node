import { PrismaCultivationsRepository } from '@/repositories/prisma/prisma-cultivations-repository'
import { UpdateCultivationUseCase } from '@/use-cases/cultivations/update-cultivation'
import { NotFoundError } from '@/use-cases/errors/not-found-error'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdateCultivation (req: FastifyRequest, res: FastifyReply) {
  const createCultivationBodySchema = z.object({
    cultivationId: z.string(),
    name: z.string().min(3, 'O nome deve ter mais de 3 caracteres').optional(),
    description: z.string().optional(),
    probableHarvestDate: z
      .string()
      .min(3, 'O campo tempo até a colheita deve ter mais de 3 caracteres')
      .regex(/(anos|meses|ano|mes)/, "O campo deve conter 'anos/ano' ou 'meses/mes'")
      .optional()
  })

  const {
    name,
    description,
    probableHarvestDate,
    cultivationId
  } = createCultivationBodySchema.parse(req.body)

  try {
    // const probableHarvestDateObj = new Date(probableHarvestDate)
    const prismaCultivationsRepository = new PrismaCultivationsRepository()
    const updateCultivationUseCase = new UpdateCultivationUseCase(prismaCultivationsRepository)

    await updateCultivationUseCase.execute({
      cultivationId,
      name,
      description,
      probableHarvestDate
    })
  } catch (err) {
    console.error(err)
    if (err instanceof NotFoundError) {
      return res.status(409).send({ message: err.message })
    }

    return res.status(409).send({ message: err })
  }

  return res.status(200).send()
}
