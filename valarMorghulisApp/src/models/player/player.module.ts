import { Module } from '@nestjs/common';
import { PlayerController } from './controller/player.controller';
import { PlayerService } from './service/player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entity/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
