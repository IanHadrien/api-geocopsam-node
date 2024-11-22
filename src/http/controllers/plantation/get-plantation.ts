import { PaginationQuery } from '@/@types/fastifyRequest'
import { PrismaPlantationsRepository } from '@/repositories/prisma/prisma-plantations-repositories'
import { GetPlantationUseCase } from '@/use-cases/plantations/get-plantation'
import { FastifyReply } from 'fastify'

export async function GetPlantation (req: PaginationQuery, res: FastifyReply) {
  const prismaPlantationsRepository = new PrismaPlantationsRepository()

  const page = req.query.page ? parseInt(req.query.page) : undefined
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined
  const userId = req.query.userId ? String(req.query.userId) : null
  const cultivationId = req.query.cultivationId ? String(req.query.cultivationId) : null

  try {
    const getUseCase = new GetPlantationUseCase(prismaPlantationsRepository)
    const plantations = getUseCase.execute(page, pageSize, userId, cultivationId)

    return plantations
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error('Error: ', err)

    return res.status(500).send()
  }
}
