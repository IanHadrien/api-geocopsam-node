import { PrismaPlantationsRepository } from '@/repositories/prisma/prisma-plantations-repositories'
import { GetPlantationUseCase } from '@/use-cases/plantations/get-plantation'
import { FastifyReply } from 'fastify'

export async function GetPlantation (res: FastifyReply) {
  const prismaPlantationsRepository = new PrismaPlantationsRepository()

  try {
    const getUseCase = new GetPlantationUseCase(prismaPlantationsRepository)
    const plantations = getUseCase.execute()

    return plantations
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error('Error: ', err)

    return res.status(500).send()
  }
}
