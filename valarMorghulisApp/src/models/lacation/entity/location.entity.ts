import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocationTypeEnum } from '../../../enums';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn()
  locationId: number;

  @Column({
    length: 10,
    nullable: false,
    unique: true,
  })
  locationName: string;

  @Column({
    length: 1000,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: LocationTypeEnum,
    nullable: false,
  })
  locationType: LocationTypeEnum;
}
