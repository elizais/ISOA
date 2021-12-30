import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerDto } from '../dto/player.dto';
import { PlayerService } from '../service/player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('/')
  async create(@Body() player: PlayerDto): Promise<PlayerDto> {
    return await this.playerService.create(player);
  }

  @Get('/')
  async findAll(): Promise<PlayerDto[]> {
    return await this.playerService.findAll();
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: PostModel,
  ): PostModel {
    return this.postsService.update(id, post);
  }
}
