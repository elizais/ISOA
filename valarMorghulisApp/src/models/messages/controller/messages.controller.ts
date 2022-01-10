import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  MessagesDto,
  MessagesDtoGet,
  MessagesGetPlayerToDto,
  MessagesUpdateDto,
} from '../dto';
import { MessagesService } from '../service';
import { PlayerDtoGetMessage } from '../../player';
import JwtAuthenticationGuard from '../../../common/guard/jwtAuthentication.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('/')
  @UseGuards(JwtAuthenticationGuard)
  async postMessage(@Body() message: MessagesDto): Promise<MessagesDto> {
    return await this.messageService.createMessage(message);
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  async getAllMessagesPlayerByPlayer(
    message: MessagesDtoGet,
  ): Promise<MessagesDto[]> {
    return this.messageService.findALlMessagesPlayerByPlayer(message);
  }

  @Get('/all')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPlayerTo(
    @Body() playerFrom: MessagesGetPlayerToDto,
  ): Promise<PlayerDtoGetMessage[]> {
    return await this.messageService.findAllPlayerTo(playerFrom);
  }

  @Patch('/')
  @UseGuards(JwtAuthenticationGuard)
  async updateMessage(message: MessagesUpdateDto): Promise<MessagesDto> {
    return await this.messageService.updateMessage(message);
  }

  @Delete('/')
  @UseGuards(JwtAuthenticationGuard)
  async delete(message: MessagesDto): Promise<MessagesDto> {
    return await this.messageService.delete(message);
  }
}
