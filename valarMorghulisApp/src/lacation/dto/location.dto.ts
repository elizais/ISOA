import { IsEnum, IsNumber, IsString } from 'class-validator';
import { LocationType } from '../../enum/locationType';

export class LocationDto {
  @IsNumber()
  locationId: number;

  @IsString()
  locationName: string;

  @IsString()
  description: string;

  @IsEnum(LocationType)
  locationType: LocationType;
}
