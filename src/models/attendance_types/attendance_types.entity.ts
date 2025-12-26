import { ClassAttendance } from '../attendances/attendances.entity';

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

@Entity('attendance_types')
export class ClassAttendanceType {
  @PrimaryGeneratedColumn()
  id: number;

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