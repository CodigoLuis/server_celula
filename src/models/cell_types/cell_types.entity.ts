import { ClassCell } from '../cells/cells.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';

@Entity('cell_types')
export class ClassCellType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @OneToMany(() => ClassCell, (cell) => cell.cellType)
  cells?: ClassCell[];
}