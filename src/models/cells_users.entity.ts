import { ClassMemberType } from './member_types.entity';
import { ClassCell } from './cells.entity';
import { ClassPerson } from './persons.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cells_persons')
export class ClassCellsPersons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassMemberType, (memberType) => memberType.cellsPersons, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'member_type_id' })
  memberType: ClassMemberType;

  @ManyToOne(() => ClassCell, (cell) => cell.cellsPersons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cell_id' })
  cell: ClassCell;

  @ManyToOne(() => ClassPerson , (person) => person.cellsPersons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  persons: ClassPerson ;

}