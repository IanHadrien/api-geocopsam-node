import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '@/use-cases/users/get-user'
import { FastifyReply } from 'fastify'

export async function GetUser (res: FastifyReply) {
  const prismaUsersRepository = new PrismaUsersRepository()

  try {
    const userUseCase = new GetUserUseCase(prismaUsersRepository)
    const users = userUseCase.execute()

    return users
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error(err)

    return res.status(500).send()
  }
}
