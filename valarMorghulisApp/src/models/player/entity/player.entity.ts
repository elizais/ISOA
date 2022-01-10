import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PlayerClassEnum } from '../../../enums';
import { LocationEntity } from '../../lacation';
import { Role } from '../../../enums/role.enum';

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
    enum: PlayerClassEnum,
    nullable: false,
  })
  playerClass: PlayerClassEnum;

  @Column({
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    default: 1,
  })
  level: number;

  @OneToOne(() => LocationEntity)
  @JoinColumn()
  position: LocationEntity;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roles: Role;
}
