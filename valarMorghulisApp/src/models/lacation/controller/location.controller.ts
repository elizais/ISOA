import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { LocationService } from '../service';
import { LocationDto, LocationDtoGet, LocationDtoUpdate } from '../dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post('/')
  async create(@Body() location: LocationDto): Promise<LocationDto> {
    return await this.locationService.create(location);
  }

  @Get('/all')
  async findAll(): Promise<LocationDto[]> {
    return await this.locationService.findAll();
  }

  @Get('/')
  async findByName(@Body() nameLocation: LocationDtoGet): Promise<LocationDto> {
    return await this.locationService.findByName(nameLocation);
  }

  @Patch('/')
  async update(@Body() location: LocationDtoUpdate): Promise<LocationDto> {
    return await this.locationService.update(location);
  }

  @Delete('/')
  async delete(@Body() location: LocationDto): Promise<LocationDto> {
    return await this.locationService.delete(location);
  }
}
