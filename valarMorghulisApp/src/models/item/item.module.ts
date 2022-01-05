import { Module } from '@nestjs/common';
import { ItemController } from './controller';
import { ItemService } from './service';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
