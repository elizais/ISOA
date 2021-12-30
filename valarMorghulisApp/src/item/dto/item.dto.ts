import { ItemTypeDto } from './itemType.dto';
import { IsNumber, ValidateNested } from 'class-validator';
import { PlayerDto } from '../../player/dto/player.dto';

export class ItemDto {
  @IsNumber()
  id: number;

  @ValidateNested()
  itemType: ItemTypeDto;

  @ValidateNested()
  owner: PlayerDto;
}
