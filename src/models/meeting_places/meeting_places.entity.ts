import { ClassUser } from '../users/users.entity';
// import { ClassCell } from '../cells/cells.entity'; // Importado para la relación inversa
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

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  // Para coordenadas, usamos 'decimal' para evitar redondeos de punto flotante
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassUser, (user) => user.meetingPlaces, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser;

  @OneToMany(() => ClassSpecialActivity, (sa) => sa.meetingPlace)
  specialActivities?: ClassSpecialActivity[];

  @OneToMany(() => ClassPredeterminedMeetingPlace, (pmp) => pmp.meetingPlace)
  predeterminedMeetingPlaces?: ClassPredeterminedMeetingPlace[];
}
