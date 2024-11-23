import { PrismaPlantationsRepository } from '@/repositories/prisma/prisma-plantations-repositories'
import { DeletePlantationUseCase } from '@/use-cases/plantations/delete-plantation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function DeletePlantation (req: FastifyRequest, res: FastifyReply) {
  const plantationId = req.params.id as string

  const prismaPlantationsRepository = new PrismaPlantationsRepository()

  try {
    const deleteUseCase = new DeletePlantationUseCase(prismaPlantationsRepository)
    await deleteUseCase.execute({ plantationId })

    return res.status(200).send({ message: 'Plantation deleted successfully' })
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error('Error: ', err)

    return res.status(500).send()
  }
}
