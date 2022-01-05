import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  MessagesDto,
  MessagesDtoGet,
  MessagesGetPlayerToDto,
  MessagesUpdateDto,
} from '../dto';
import { MessagesService } from '../service';
import { PlayerDtoGetMessage } from '../../player';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('/')
  async postMessage(@Body() message: MessagesDto): Promise<MessagesDto> {
    return await this.messageService.createMessage(message);
  }

  @Get('/')
  async getALlMessagesPlayerByPlayer(
    message: MessagesDtoGet,
  ): Promise<MessagesDto[]> {
    return this.messageService.findALlMessagesPlayerByPlayer(message);
  }

  @Get('/all')
  async getAllPlayerTo(
    @Body() playerFrom: MessagesGetPlayerToDto,
  ): Promise<PlayerDtoGetMessage[]> {
    return await this.messageService.findAllPlayerTo(playerFrom);
  }

  @Patch('/')
  async updateMessage(message: MessagesUpdateDto): Promise<MessagesDto> {
    return await this.messageService.updateMessage(message);
  }

  @Delete('/')
  async delete(message: MessagesDto): Promise<MessagesDto> {
    return await this.messageService.delete(message);
  }
}
