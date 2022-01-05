import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entity';
import { ModelRepository } from '../../model.repository';
import { LocationDto, LocationDtoGet, LocationDtoUpdate } from '../dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: ModelRepository<LocationEntity>,
  ) {}

  create(location: LocationDto): Promise<LocationDto> {
    return this.locationRepository.createEntity(location);
  }

  findAll(): Promise<LocationDto[]> {
    return this.locationRepository.find();
  }

  findByName(name: LocationDtoGet): Promise<LocationDto> {
    return this.locationRepository.findOne(name);
  }

  update(inputs: LocationDtoUpdate): Promise<LocationDto> {
    return this.locationRepository.updateDescription(
      inputs.locationName,
      inputs,
    );
  }

  delete(location: LocationDto): Promise<LocationDto> {
    return this.locationRepository.remove(location);
  }
}
