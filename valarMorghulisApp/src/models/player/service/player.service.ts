import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PlayerDto, PlayerDtoRegistration } from '../dto';
import { PlayerEntity } from '../entity';
import { ModelRepository } from '../../model.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: ModelRepository<PlayerEntity>,
  ) {}

  create(palyer: PlayerDtoRegistration): Promise<PlayerDto> {
    return this.playerRepository.createEntity(palyer);
  }

  findAll(): Promise<PlayerDto[]> {
    return this.playerRepository.find();
  }

  findById(id: number): Promise<PlayerDto> {
    try {
      return this.playerRepository.findOne(id);
    } catch (error) {
      throw new HttpException(
        'Player with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findByName(name: string): Promise<PlayerDto> {
    try {
      return this.playerRepository.findOne(name);
    } catch (error) {
      throw new HttpException(
        'Player with this name does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findByEmail(email: string): Promise<PlayerEntity> {
    try {
      return this.playerRepository.findOne(email);
    } catch (error) {
      throw new HttpException(
        'Player with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id, inputs: PlayerEntity): Promise<PlayerDto> {
    return this.playerRepository.updateEntity(id, inputs);
  }

  delete(player: PlayerEntity): Promise<PlayerDto> {
    return this.playerRepository.remove(player);
  }
}
