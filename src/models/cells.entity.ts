import { ClassCellType } from './cell_types.entity';
import { ClassUser  } from './users.entity';
import { ClassCellsUsers } from './cells_users.entity';
import { ClassMeeting } from './meetings.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cells')
export class ClassCell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassCellType, (cellType) => cellType.cells, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cell_type_id' })
  cellType: ClassCellType;

  @ManyToOne(() => ClassUser , (user) => user.cells, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser ;

  @OneToMany(() => ClassCellsUsers, (cu) => cu.cell)
  cellsUsers?: ClassCellsUsers[];

  @OneToMany(() => ClassMeeting, (meeting) => meeting.cell)
  meetings?: ClassMeeting[];
}