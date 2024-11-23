import { PrismaCultivationsRepository } from '@/repositories/prisma/prisma-cultivations-repository'
import { DeleteCultivationUseCase } from '@/use-cases/cultivations/delete-cultivation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function DeleteCultivation (req: FastifyRequest, res: FastifyReply) {
  const cultivationId = req.params.id as string

  const prismaCultivationsRepository = new PrismaCultivationsRepository()

  try {
    const deleteUseCase = new DeleteCultivationUseCase(prismaCultivationsRepository)
    await deleteUseCase.execute({ cultivationId })

    return res.status(200).send({ message: 'Cultivation deleted successfully' })
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error('Error: ', err)

    return res.status(500).send()
  }
}
