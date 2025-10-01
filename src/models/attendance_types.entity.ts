import { ClassAttendance } from './attendances.entity';

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

@Entity('attendance_types')
export class ClassAttendanceType {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @OneToMany(() => ClassAttendance, (attendance) => attendance.attendanceType)
  attendances?: ClassAttendance[];
}