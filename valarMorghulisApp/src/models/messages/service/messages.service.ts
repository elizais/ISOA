import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesEntity } from '../entity';
import { ModelRepository } from '../../model.repository';
import {
  MessagesDto,
  MessagesDtoGet,
  MessagesGetPlayerToDto,
  MessagesUpdateDto,
} from '../dto';
import { PlayerDtoGetMessage } from '../../player';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private messagesRepository: ModelRepository<MessagesEntity>,
  ) {}

  createMessage(message: MessagesDto): Promise<MessagesDto> {
    return this.messagesRepository.createEntity(message);
  }

  findALlMessagesPlayerByPlayer(
    messages: MessagesDtoGet,
  ): Promise<MessagesDto[]> {
    return this.messagesRepository.find(messages);
  }

  findAllPlayerTo(
    playerFrom: MessagesGetPlayerToDto,
  ): Promise<PlayerDtoGetMessage[]> {
    return this.messagesRepository
      .find(playerFrom)
      .then((messages) => messages.map((message) => message.playerTo))
      .catch((error) => Promise.reject(error));
  }

  updateMessage(message: MessagesUpdateDto): Promise<MessagesDto> {
    return this.messagesRepository.createEntity(message);
  }

  delete(message: MessagesDto): Promise<MessagesDto> {
    return this.messagesRepository
      .delete(message)
      .then(async () => await this.messagesRepository.get(message.messageId))
      .catch((error) => Promise.reject(error));
  }
}
