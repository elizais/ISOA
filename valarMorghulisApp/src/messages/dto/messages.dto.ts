import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { PlayerDto } from '../../player/dto/player.dto';

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
