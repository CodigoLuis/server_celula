import { ClassMeeting } from './meetings.entity';
import { ClassAttendanceType } from './attendance_types.entity';
import { ClassPerson } from './persons.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('attendances')
export class ClassAttendance {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @PrimaryColumn({ name: 'meeting_id', type: 'varchar', length: 40 })
  meetingId: string;

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
  attendance?: boolean;
}
