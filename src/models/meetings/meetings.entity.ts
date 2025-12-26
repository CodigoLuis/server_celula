import { ClassUser } from '../users/users.entity';
import { ClassCell } from '../cells/cells.entity';
import { ClassTitle } from '../titles/titles.entity';
import { ClassMeetingPlace } from '../meeting_places/meeting_places.entity';
import { ClassMeetingDetail } from '../meeting_details/meeting_details.entity';
import { ClassAttendance } from '../attendances/attendances.entity';
import { ClassSpecialActivity } from '../special_activities/special_activities.entity'; // Importado
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';

@Entity('meetings')
export class ClassMeeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', nullable: true, name: 'end_time' })
  endTime?: string;

  @Column({ nullable: true })
  completed?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassCell, (cell) => cell.meetings, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cell_id' })
  cell: ClassCell;

  @ManyToOne(() => ClassUser, (user) => user.meetings, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser;

  @ManyToOne(() => ClassTitle, (title) => title.meetings, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'title_id' })
  title: ClassTitle;

  @OneToOne(() => ClassMeetingDetail, (detail) => detail.meeting)
  meetingDetail?: ClassMeetingDetail;

  @OneToMany(() => ClassAttendance, (attendance) => attendance.meeting)
  attendances?: ClassAttendance[];

  @OneToMany(() => ClassSpecialActivity, (sa) => sa.meeting)
  specialActivities?: ClassSpecialActivity[];
}