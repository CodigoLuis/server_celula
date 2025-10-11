import { ClassPerson } from './persons/persons.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('education')
export class ClassEducation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2, nullable: true, name: 'consolidation_level' })
  consolidationLevel?: string;

  @Column({ nullable: true, name: 'leader_school' })
  leaderSchool?: boolean;

  @Column({ nullable: true, name: 'prophetic_school' })
  propheticSchool?: boolean;

  @ManyToOne(() => ClassPerson, (person) => person.education, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person: ClassPerson;
}