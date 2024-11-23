import { MapRepository } from '@/repositories/interfaces/map-repository'

interface GetAllMapUseCaseResponse {
  maps: Array<Array<{ lat: number, lng: number }>>
}

export class GetAllMapUseCase {
  constructor (private readonly mapRepository: MapRepository) {}

  async execute (): Promise<GetAllMapUseCaseResponse> {
    const maps = await this.mapRepository.getAll()

    if (!maps) {
      // throw new ResourceNotFoundError()
      console.error('Maps not found')
    }

    return {
      maps
    }
  }
}
