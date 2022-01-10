import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PlayerDto } from '../dto';
import { PlayerService } from '../service';
import { PlayerEntity } from '../entity';
import { Role } from '../../../enums';
import JwtAuthenticationGuard from '../../../common/guard/jwtAuthentication.guard';
import { RoleGuard } from '../../../common';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('/')
  async create(@Body() player: PlayerEntity): Promise<PlayerDto> {
    return await this.playerService.create(player);
  }

  @Get('/')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthenticationGuard)
  async findAll(): Promise<PlayerDto[]> {
    return await this.playerService.findAll();
  }

  @Get('/:id')
  @UseGuards(RoleGuard(Role.Admin))
  async findById(@Param('id') id: number): Promise<PlayerDto> {
    return await this.playerService.findById(id);
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  async findByName(@Body() name: string): Promise<PlayerDto> {
    return await this.playerService.findByName(name);
  }

  @Put('/:id')
  @UseGuards(JwtAuthenticationGuard)
  async update(
    @Param('id') id: number,
    @Body() player: PlayerEntity,
  ): Promise<PlayerDto> {
    return await this.playerService.update(id, player);
  }

  @Delete('/')
  @UseGuards(JwtAuthenticationGuard)
  async delete(@Body() player: PlayerEntity): Promise<PlayerDto> {
    return await this.playerService.delete(player);
  }
}
