import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../service';
import { PlayerDtoRegistration } from '../../player';
import { LocalAuthenticationGuard } from '../../../common';
import { RequestWithPlayer } from '../../../common/interface';
import { Response } from 'express';
import JwtAuthenticationGuard from '../../../common/guard/jwtAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: PlayerDtoRegistration) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithPlayer, @Res() response: Response) {
    const { player } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(player.id);
    response.setHeader('Set-Cookie', cookie);
    return response.send(player);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithPlayer) {
    const player = request.player;
    return player;
  }
}
