import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUsersProfileUseCase } from '@/use-cases/users/get-user-profile'

export function makeGetUserProfileUseCase () {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUsersProfileUseCase(usersRepository)

  return useCase
}
