import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayerDto } from '../dto/player.dto';
import { PlayerService } from '../service/player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('/')
  create(@Body() player: PlayerDto): PlayerDto {
    return this.playerService.create(player);
  }

  @Get('/')
  findAll(): PlayerDto[] {
    return this.playerService.findAll();
  }
}
