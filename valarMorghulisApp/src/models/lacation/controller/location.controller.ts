import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from '../service';
import { LocationDto, LocationDtoGet, LocationDtoUpdate } from '../dto';
import { Role } from '../../../enums';
import JwtAuthenticationGuard from '../../../common/guard/jwtAuthentication.guard';
import { RoleGuard } from '../../../common';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post('/')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthenticationGuard)
  async create(@Body() location: LocationDto): Promise<LocationDto> {
    return await this.locationService.create(location);
  }

  @Get('/all')
  @UseGuards(JwtAuthenticationGuard)
  async findAll(): Promise<LocationDto[]> {
    return await this.locationService.findAll();
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  async findByName(@Body() nameLocation: LocationDtoGet): Promise<LocationDto> {
    return await this.locationService.findByName(nameLocation);
  }

  @Patch('/')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthenticationGuard)
  async update(@Body() location: LocationDtoUpdate): Promise<LocationDto> {
    return await this.locationService.update(location);
  }

  @Delete('/')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthenticationGuard)
  async delete(@Body() location: LocationDto): Promise<LocationDto> {
    return await this.locationService.delete(location);
  }
}
