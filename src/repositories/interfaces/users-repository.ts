import { type Prisma, type User } from '@prisma/client'

export interface UsersRepository {
  // findById: (id: string) => Promise<User | null>
  getAll: () => Promise<User[]>
  findByEmail: (email: string) => Promise<User | null>
  create: (data: Prisma.UserCreateInput) => Promise<User>
}
