import { Request } from 'express';
import { PlayerDtoRole } from '../../models';

export interface RequestWithPlayer extends Request {
  player: PlayerDtoRole;
}
