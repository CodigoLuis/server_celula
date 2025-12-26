import { ClassCellsPersons } from '../cells_persons/cells_persons.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';

@Entity('member_types')
export class ClassMemberType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @OneToMany(() => ClassCellsPersons, (cu) => cu.memberType)
  cellsPersons?: ClassCellsPersons[];

}