import { PrismaCultivationsRepository } from '@/repositories/prisma/prisma-cultivations-repository'
import { GetCultivationUseCase } from '@/use-cases/cultivations/get-cultivation'
import { FastifyReply } from 'fastify'

export async function GetCultivation (res: FastifyReply) {
  const prismaCultivationsRepository = new PrismaCultivationsRepository()

  try {
    const cultivationUseCase = new GetCultivationUseCase(prismaCultivationsRepository)
    const cultivations = cultivationUseCase.execute()

    return cultivations
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error(err)

    return res.status(500).send()
  }
}