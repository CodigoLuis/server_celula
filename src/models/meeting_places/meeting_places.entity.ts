import { ClassUser } from '../users/users.entity';
import { ClassCell } from '../cells/cells.entity'; // Importado para la relación inversa
import { ClassSpecialActivity } from '../special_activities/special_activities.entity'; // Importado
import { ClassPredeterminedMeetingPlace } from '../predetermined_meeting_places/predetermined_meeting_places.entity'; // Importado
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';

@Entity('meeting_places')
export class ClassMeetingPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({ length: 60, nullable: true })
  location?: string;

  @Column({ length: 150 })
  details: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassUser, (user) => user.meetingPlaces, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser;

  @OneToMany(() => ClassCell, (cell) => cell.meetingPlace)
  cells?: ClassCell[];

  @OneToMany(() => ClassSpecialActivity, (sa) => sa.meetingPlace)
  specialActivities?: ClassSpecialActivity[];

  @OneToMany(() => ClassPredeterminedMeetingPlace, (pmp) => pmp.meetingPlace)
  predeterminedMeetingPlaces?: ClassPredeterminedMeetingPlace[];
}