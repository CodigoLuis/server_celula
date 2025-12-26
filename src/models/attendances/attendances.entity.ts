import { ClassMeeting } from '../meetings/meetings.entity';
import { ClassAttendanceType } from '../attendance_types/attendance_types.entity';
import { ClassPerson } from '../persons/persons.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';

@Entity('attendances')
export class ClassAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'person_id', type: 'int' })
  personId: number;

  @Column({ name: 'meeting_id', type: 'int' })
  meetingId: number;

  @ManyToOne(() => ClassPerson, (person) => person.attendances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person: ClassPerson;

  @ManyToOne(() => ClassMeeting, (meeting) => meeting.attendances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meeting_id' })
  meeting: ClassMeeting;

  @ManyToOne(() => ClassAttendanceType, (attendanceType) => attendanceType.attendances, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'attendance_type_id' })
  attendanceType: ClassAttendanceType;

  @Column({ nullable: true })
  attended?: boolean;
}