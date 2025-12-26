import { ClassUser } from '../users/users.entity';
import { ClassMeeting } from '../meetings/meetings.entity';

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

@Entity('titles')
export class ClassTitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassUser, (user) => user.titles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser;

  @OneToMany(() => ClassMeeting, (meeting) => meeting.title)
  meetings?: ClassMeeting[];
}