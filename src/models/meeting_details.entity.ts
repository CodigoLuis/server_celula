import { ClassMeeting } from './meetings.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('meeting_details')
export class ClassMeetingDetail {
  @PrimaryColumn({ length: 40 })
  id: string;

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