import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'

interface GetUsersProfileUseCaseRequest {
  id: string
}

interface GetUsersProfileUseCaseResponse {
  user: User
}

export class GetUsersProfileUseCase {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute ({
    id
  }: GetUsersProfileUseCaseRequest): Promise<GetUsersProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new NotFoundError()
    }

    return {
      user
    }
  }
}
