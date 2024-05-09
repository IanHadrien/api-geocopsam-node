import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'

interface GetUserUseCaseResponse {
  users: User[]
}

export class GetUserUseCase {
  constructor (private readonly userRepository: UsersRepository) {}

  async execute (): Promise<GetUserUseCaseResponse> {
    const users = await this.userRepository.getAll()

    if (!users) {
      // throw new ResourceNotFoundError()
      console.error('User not found')
    }

    return {
      users
    }
  }
}
