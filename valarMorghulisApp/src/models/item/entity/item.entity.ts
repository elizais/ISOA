import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PlayerEntity } from '../../player';
import { ItemTypeEntity } from './';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ItemTypeEntity)
  @JoinColumn()
  itemType: ItemTypeEntity;

  @Column()
  quality: number;

  @OneToOne(() => PlayerEntity)
  @JoinColumn()
  owner: PlayerEntity;
}
