import { PrismaMappedAreaRepository } from '@/repositories/prisma/prisma-mapped-area-repositories'
import { DeleteMappedAreaUseCase } from '@/use-cases/mapped-area/delete-mapped-area'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function DeleteMappedArea (req: FastifyRequest, res: FastifyReply) {
  const mappedAreaId = req.params.id as string

  const prismaMappedAreaRepository = new PrismaMappedAreaRepository()

  try {
    const deleteUseCase = new DeleteMappedAreaUseCase(prismaMappedAreaRepository)
    await deleteUseCase.execute({ mappedAreaId })

    return res.status(200).send({ message: 'Mapped Area deleted successfully' })
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error('Error: ', err)

    return res.status(500).send()
  }
}
