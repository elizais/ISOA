import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemTypeEntity } from './itemType.entity';
import { PlayerEntity } from '../../player/entity/player.entity';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ItemTypeEntity)
  @JoinColumn()
  itemType: ItemTypeEntity;

  @OneToOne(() => PlayerEntity)
  @JoinColumn()
  owner: PlayerEntity;
}
