import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LocationTypeEnum } from '../../../enums';

export class LocationDto {
  @IsNumber()
  locationId: number;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(LocationTypeEnum)
  @IsNotEmpty()
  locationType: LocationTypeEnum;
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
