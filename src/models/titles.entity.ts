import { ClassUser  } from './users/users.entity';
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

@Entity('titles')
export class ClassTitle {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 30 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassUser , (user) => user.titles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser ;

  @OneToMany(() => ClassMeeting, (meeting) => meeting.title)
  meetings?: ClassMeeting[];
}