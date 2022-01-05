import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { PlayerDto } from '../../player';

export class MessagesDto {
  @IsNumber()
  messageId: number;

  @ValidateNested()
  playerFrom: PlayerDto;

  @ValidateNested()
  playerTo: PlayerDto;

  @IsString()
  messageText: string;
}

export class MessagesDtoGet {
  @ValidateNested()
  playerFrom: PlayerDto;

  @ValidateNested()
  playerTo: PlayerDto;
}

export class MessagesGetPlayerToDto {
  @ValidateNested()
  playerFrom: PlayerDto;
}

export class MessagesUpdateDto {
  @IsString()
  messageText: string;
}
