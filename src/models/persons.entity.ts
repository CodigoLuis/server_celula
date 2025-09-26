import { ClassEducation } from './education.entity';
import { ClassUser  } from './users.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
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

  @Column({ length: 12, nullable: true, name: 'id_number' })
  idNumber?: string;

  @Column({ length: 50, nullable: true, name: 'education_level' })
  educationLevel?: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column({ length: 150, nullable: true })
  address?: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @OneToOne(() => ClassEducation, (education) => education.person)
  education?: ClassEducation;

  @OneToMany(() => ClassUser , (user) => user.person)
  users?: ClassUser [];
}