import { IsNumber, IsString } from 'class-validator';

export class ItemTypeDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
