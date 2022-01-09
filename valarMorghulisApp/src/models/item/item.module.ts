import { Module } from '@nestjs/common';
import { ItemController } from './controller';
import { ItemService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity, ItemTypeEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity, ItemTypeEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
