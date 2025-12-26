import { ClassCell } from '../cells/cells.entity';
import { ClassMeetingPlace } from '../meeting_places/meeting_places.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('predetermined_meeting_places')
export class ClassPredeterminedMeetingPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassCell, (cell) => cell.predeterminedMeetingPlaces, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cell_id' })
  cell: ClassCell;

  @ManyToOne(() => ClassMeetingPlace, (place) => place.predeterminedMeetingPlaces, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'meeting_place_id' })
  meetingPlace: ClassMeetingPlace;
}