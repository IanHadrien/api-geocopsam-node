import { makeCreateCultivationUseCase } from '@/factories/make-create-cultivation-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateCultivation (req: FastifyRequest, res: FastifyReply) {
  const createCultivationBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    probableHarvestDate: z.string()
  })

  console.log(createCultivationBodySchema)

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
