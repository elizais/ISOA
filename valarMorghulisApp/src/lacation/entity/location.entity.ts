import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocationType } from '../../enum/locationType';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn()
  locationId: number;

  @Column({
    length: 10,
  })
  locationName: string;

  @Column({
    length: 250,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: LocationType,
  })
  locationType: LocationType;
}
