import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PlayerClass } from '../../../enum';
import { LocationDto } from '../../lacation';

export class PlayerDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PlayerClass)
  @IsNotEmpty()
  playerClass: PlayerClass;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @ValidateNested()
  @IsOptional()
  position: LocationDto;
}

export class PlayerDtoGetMessage {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PlayerClass)
  @IsNotEmpty()
  playerClass: PlayerClass;

  @IsNumber()
  @IsNotEmpty()
  level: number;
}

// @ValidateNested({ each: true }) - вложенный
