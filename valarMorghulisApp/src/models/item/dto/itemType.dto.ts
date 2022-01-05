import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemTypeDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
