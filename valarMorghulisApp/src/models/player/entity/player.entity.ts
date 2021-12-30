import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PlayerClass } from '../../../enum/playerClass';
import { LocationEntity } from '../../lacation/entity/location.entity';

@Entity()
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: PlayerClass,
    nullable: false,
  })
  playerClass: PlayerClass;

  @Column({
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  level: number;

  @OneToOne(() => LocationEntity)
  @JoinColumn()
  position: LocationEntity;

  @Column()
  password: string;
}
