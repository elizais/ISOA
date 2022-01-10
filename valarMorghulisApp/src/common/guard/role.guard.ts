import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithPlayer } from '../interface';
import { Role } from '../../enums';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithPlayer>();
      const player = request.player;

      return player?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
