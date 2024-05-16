import { PrismaMappedAreaRepository } from '@/repositories/prisma/prisma-mapped-area-repositories'
import { GetMappedAreaUseCase } from '@/use-cases/mapped-area/get-mapped-area'
import { FastifyReply } from 'fastify'

export async function GetMappedArea (res: FastifyReply) {
  const prismaMappedAreaRepository = new PrismaMappedAreaRepository()

  try {
    const mappedAreaUseCase = new GetMappedAreaUseCase(prismaMappedAreaRepository)
    const mappedAreas = mappedAreaUseCase.execute()

    return mappedAreas
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error(err)

    return res.status(500).send()
  }
}
