import { makeCreateCultivationUseCase } from '@/factories/make-create-cultivation-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateCultivation (req: FastifyRequest, res: FastifyReply) {
  const createCultivationBodySchema = z.object({
    name: z.string().min(3, 'O nome deve ter mais de 3 caracteres'),
    description: z.string().optional(),
    probableHarvestDate: z.coerce.date({
      required_error: 'A data é obrigatoria',
      invalid_type_error: 'Data inválida'
    })
  })

  const {
    name,
    description,
    probableHarvestDate
  } = createCultivationBodySchema.parse(req.body)

  try {
    const probableHarvestDateObj = new Date(probableHarvestDate)

    const createCultivationUseCase = makeCreateCultivationUseCase()

    await createCultivationUseCase.execute({
      name,
      description,
      probableHarvestDate: probableHarvestDateObj
    })
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }

    return res.status(409).send({ message: err })
  }

  return res.status(200).send()
}
