import { ClassMeeting } from '../meetings/meetings.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';

@Entity('meeting_details')
export class ClassMeetingDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  dynamic?: boolean;

  @Column({ nullable: true })
  praise?: boolean;

  @Column({ nullable: true })
  message?: boolean;

  @Column({ type: 'numeric', nullable: true })
  offering?: number;

  @Column({ nullable: true })
  consolidation?: boolean;

  @Column({ length: 3, nullable: true })
  guests?: string;

  @OneToOne(() => ClassMeeting, (meeting) => meeting.meetingDetail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meeting_id' })
  meeting: ClassMeeting;
}