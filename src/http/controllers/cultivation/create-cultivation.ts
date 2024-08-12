import { makeCreateCultivationUseCase } from '@/factories/make-create-cultivation-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateCultivation (req: FastifyRequest, res: FastifyReply) {
  const createCultivationBodySchema = z.object({
    name: z.string().min(3, 'O nome deve ter mais de 3 caracteres'),
    description: z.string().optional(),
    probableHarvestDate: z
      .string()
      .min(3, 'O campo tempo até a colheita deve ter mais de 3 caracteres')
      .regex(/(anos|meses|ano|mes)/, "O campo deve conter 'anos/ano' ou 'meses/mes'")
  })

  const {
    name,
    description,
    probableHarvestDate
  } = createCultivationBodySchema.parse(req.body)

  try {
    // const probableHarvestDateObj = new Date(probableHarvestDate)

    const createCultivationUseCase = makeCreateCultivationUseCase()

    await createCultivationUseCase.execute({
      name,
      description,
      probableHarvestDate
    })
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }

    return res.status(409).send({ message: err })
  }

  return res.status(200).send()
}
