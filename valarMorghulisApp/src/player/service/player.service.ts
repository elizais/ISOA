import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../dto/player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from '../entity/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: Repository<PlayerEntity>,
  ) {}

  create(palyer: PlayerDto): Promise<PlayerDto> {
    return this.playerRepository.save(palyer);
  }

  findAll(): Promise<PlayerDto[]> {
    return this.playerRepository.find();
  }
}
