import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerDto } from '../dto/';
import { PlayerService } from '../service';
import { PlayerEntity } from '../entity';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('/')
  async create(@Body() player: PlayerEntity): Promise<PlayerDto> {
    return await this.playerService.create(player);
  }

  @Get('/')
  async findAll(): Promise<PlayerDto[]> {
    return await this.playerService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<PlayerDto> {
    return await this.playerService.findById(id);
  }

  @Get('/')
  async findByName(@Body() name: string): Promise<PlayerDto> {
    return await this.playerService.findByName(name);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() player: PlayerEntity,
  ): Promise<PlayerDto> {
    return await this.playerService.update(id, player);
  }

  @Delete('/')
  async delete(@Body() player: PlayerEntity): Promise<PlayerDto> {
    return await this.playerService.delete(player);
  }
}
