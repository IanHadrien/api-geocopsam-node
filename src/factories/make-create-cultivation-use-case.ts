import { PrismaCultivationsRepository } from '@/repositories/prisma/prisma-cultivations-repository'
import { CreateCultivationUseCase } from '@/use-cases/cultivations/create-cultivation'

export function makeCreateCultivationUseCase () {
  const prismaCultivationsRepository = new PrismaCultivationsRepository()
  const createCultivationUseCase = new CreateCultivationUseCase(prismaCultivationsRepository)

  return createCultivationUseCase
}
