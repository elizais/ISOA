import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../../models/player';
import { AuthenticationService } from '../../models/authentication/service/authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<PlayerDto> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
