import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerEntity } from '../../player/entity/player.entity';

@Entity()
export class MessagesEntity {
  @PrimaryGeneratedColumn()
  messageId: number;

  @OneToOne(() => PlayerEntity)
  @JoinColumn()
  playerFrom: PlayerEntity;

  @OneToOne(() => PlayerEntity)
  @JoinColumn()
  playerTo: PlayerEntity;

  @Column({
    length: 1000,
    nullable: false,
  })
  messageText: string;
}
