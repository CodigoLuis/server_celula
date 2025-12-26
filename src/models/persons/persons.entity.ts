import { ClassEducation } from '../educations/educations.entity';
import { ClassUser } from '../users/users.entity';
import { ClassAttendance } from '../attendances/attendances.entity';
import { ClassCellsPersons } from '../cells_persons/cells_persons.entity'; // Asegúrate que el nombre del archivo sea cells_persons.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
 
@Entity('persons')
export class ClassPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: true })
  photo?: string;

  @Column({ length: 30, name: 'first_name' })
  firstName: string;

  @Column({ length: 40, name: 'last_name' })
  lastName: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 12, nullable: true, name: 'marital_status' })
  maritalStatus?: string;

  @Column({ length: 12, unique: true, name: 'id_number' })
  idNumber: string;

  @Column({ length: 50, nullable: true, name: 'education_level' })
  educationLevel?: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column({ length: 150, nullable: true })
  address?: string;

  @Column({ type: 'date', nullable: true, name: 'birth_date' })
  birthDate?: string; // Es nullable en SQL

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @OneToOne(() => ClassEducation, (education) => education.person)
  education?: ClassEducation;

  @OneToMany(() => ClassUser, (user) => user.person)
  users?: ClassUser[];

  @OneToMany(() => ClassAttendance, (attendance) => attendance.person)
  attendances?: ClassAttendance[];

  @OneToMany(() => ClassCellsPersons, (cu) => cu.person)
  cellsPersons?: ClassCellsPersons[];
}