import { Module } from '@nestjs/common';
import { MessagesController } from './controller';
import { MessagesService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
