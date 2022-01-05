import { Module } from '@nestjs/common';
import { LocationController } from './controller';
import { LocationService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
