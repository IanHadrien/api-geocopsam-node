/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { CreateUserUseCase } from './create-user-use-case'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository' // Criamos um repositório falso
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, it } from 'node:test'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'Admin',
      phone: '1234567890'
    })

    expect(result.user).toEqual(inMemoryUsersRepository.items[0])
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })

  it('should hash the user password upon creation', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'Admin'
    })

    const hashedPassword = await hash('123456', 6)

    expect(result.user.password_hash).toEqual(hashedPassword)
  })

  it('should not allow creating a user with an existing email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'Admin'
    })

    await expect(sut.execute({
      name: 'Jane Doe',
      email: 'johndoe@example.com',
      password: '654321',
      role: 'User'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
function expect (user: any) {
  throw new Error('Function not implemented.')
}
