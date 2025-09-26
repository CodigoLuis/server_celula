import { ClassCell } from './cells.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('cell_types')
export class ClassCellType {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @OneToMany(() => ClassCell, (cell) => cell.cellType)
  cells?: ClassCell[];
}