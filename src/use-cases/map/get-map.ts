import { MapRepository } from '@/repositories/interfaces/map-repository'

interface GetMapUseCaseResponse {
  maps: Array<Array<{ lat: number, lng: number }>>
}

export class GetMapUseCase {
  constructor (private readonly mapRepository: MapRepository) {}

  async execute (id: string): Promise<GetMapUseCaseResponse> {
    const maps = await this.mapRepository.findById(id)

    if (!maps) {
      // throw new ResourceNotFoundError()
      console.error('Maps not found')
    }

    return {
      maps
    }
  }
}
