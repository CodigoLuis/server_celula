import { ClassMemberType } from './member_types.entity';
import { ClassCell } from './cells.entity';
import { ClassUser  } from './users.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cells_users')
export class ClassCellsUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassMemberType, (memberType) => memberType.cellsUsers, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'member_type_id' })
  memberType: ClassMemberType;

  @ManyToOne(() => ClassCell, (cell) => cell.cellsUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cell_id' })
  cell: ClassCell;

  @ManyToOne(() => ClassUser , (user) => user.cellsUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser ;
}