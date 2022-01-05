import { ItemTypeDto } from './itemType.dto';
import {
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PlayerDto } from '../../player';

export class ItemDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @ValidateNested()
  itemType: ItemTypeDto;

  @IsNumber()
  @Min(0)
  @Max(100)
  quality: number;

  @ValidateNested()
  @IsOptional()
  owner: PlayerDto;
}

export class ItemDtoUpdate {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  quality: number;
}
