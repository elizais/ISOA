import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PlayerClass } from '../../../enum';
import { LocationEntity } from '../../lacation';

@Entity()
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
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

  @Column({
    nullable: false,
  })
  password: string;
}
