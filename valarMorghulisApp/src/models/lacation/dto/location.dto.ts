import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LocationType } from '../../../enum';

export class LocationDto {
  @IsNumber()
  locationId: number;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(LocationType)
  @IsNotEmpty()
  locationType: LocationType;
}

export class LocationDtoUpdate {
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class LocationDtoGet {
  @IsString()
  @IsNotEmpty()
  locationName: string;
}
