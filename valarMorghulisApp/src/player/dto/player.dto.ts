import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { PlayerClass } from '../../enum/playerClass';
import { LocationDto } from '../../lacation/dto/location.dto';

export class PlayerDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEnum(PlayerClass)
  playerClass: PlayerClass;

  @IsString()
  email: string;

  @IsNumber()
  level: number;

  @ValidateNested()
  position: LocationDto;
}

// @ValidateNested({ each: true }) - вложенный
