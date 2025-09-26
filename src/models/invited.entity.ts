import { ClassUser  } from './users.entity';
import { ClassMeeting } from './meetings.entity';

import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('invited')
export class ClassInvited {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @PrimaryColumn({ name: 'meeting_id', type: 'varchar', length: 40 })
  meetingId: string;

  @ManyToOne(() => ClassUser , (user) => user.invitations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser ;

  @ManyToOne(() => ClassMeeting, (meeting) => meeting.inviteds, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meeting_id' })
  meeting: ClassMeeting;
}
