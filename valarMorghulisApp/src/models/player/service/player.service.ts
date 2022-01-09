import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PlayerDto } from '../dto';
import { PlayerEntity } from '../entity';
import { ModelRepository } from '../../model.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: ModelRepository<PlayerEntity>,
  ) {}

  create(palyer: PlayerEntity): Promise<PlayerDto> {
    return this.playerRepository.createEntity(palyer);
  }

  findAll(): Promise<PlayerDto[]> {
    return this.playerRepository.find();
  }

  findById(id: number): Promise<PlayerDto> {
    return this.playerRepository.findOne(id);
  }

  findByName(name: string): Promise<PlayerDto> {
    return this.playerRepository.findOne(name);
  }

  update(id, inputs: PlayerEntity): Promise<PlayerDto> {
    return this.playerRepository.updateEntity(id, inputs);
  }

  delete(player: PlayerEntity): Promise<PlayerDto> {
    return this.playerRepository.remove(player);
  }
}
