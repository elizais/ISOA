import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthenticationModule,
  ItemModule,
  LocationModule,
  MessagesModule,
  PlayerModule,
} from './models';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    // TypeOrmModule.forRoot(),
    AuthenticationModule,
    PlayerModule,
    LocationModule,
    ItemModule,
    MessagesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
