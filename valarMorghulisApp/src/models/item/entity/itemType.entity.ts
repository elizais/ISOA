import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;
}
