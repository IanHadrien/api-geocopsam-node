import { MapRepository } from '@/repositories/interfaces/map-repository'

interface GetMapUseCaseResponse {
  maps: Array<{ lat: string, lng: string }>
}

export class GetMapUseCase {
  constructor (private readonly mapRepository: MapRepository) {}

  async execute (id: string): Promise<GetMapUseCaseResponse> {
    const maps = await this.mapRepository.getAll(id)

    if (!maps) {
      // throw new ResourceNotFoundError()
      console.error('Maps not found')
    }

    return {
      maps
    }
  }
}
