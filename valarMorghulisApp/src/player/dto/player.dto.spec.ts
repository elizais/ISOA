import { PlayerDto } from './player.dto';

describe('PlayerEntity', () => {
  it('should be defined', () => {
    expect(new PlayerDto()).toBeDefined();
  });
});
