import { ClassUser  } from './users.entity';
import { ClassMeeting } from './meetings.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('meeting_places')
export class ClassMeetingPlace {
  @PrimaryColumn({ length: 40 })
  id: string;

  @Column({ length: 100, nullable: true })
  location?: string;

  @Column({ length: 150 })
  details: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassUser , (user) => user.meetingPlaces, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser ;

  @OneToMany(() => ClassMeeting, (meeting) => meeting.meetingPlace)
  meetings?: ClassMeeting[];
}