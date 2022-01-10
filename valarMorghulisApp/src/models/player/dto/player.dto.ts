import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PlayerClassEnum, Role } from '../../../enums';
import { LocationDto } from '../../lacation';

export class PlayerDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PlayerClassEnum)
  @IsNotEmpty()
  playerClass: PlayerClassEnum;

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

  @IsEnum(PlayerClassEnum)
  @IsNotEmpty()
  playerClass: PlayerClassEnum;

  @IsNumber()
  @IsNotEmpty()
  level: number;
}

export class PlayerDtoRegistration {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PlayerClassEnum)
  @IsNotEmpty()
  playerClass: PlayerClassEnum;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class PlayerDtoRole {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PlayerClassEnum)
  @IsNotEmpty()
  playerClass: PlayerClassEnum;

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

  @IsEnum(Role)
  @IsNotEmpty()
  roles: Role;
}

// @ValidateNested({ each: true }) - вложенный
