import { ClassCellType } from './cell_types.entity';
import { ClassUser  } from './users/users.entity';
import { ClassCellsPersons } from './cells_users.entity';
import { ClassMeeting } from './meetings.entity';
import { ClassTerritory } from './territories.entity';

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

  @ManyToOne(() => ClassTerritory, (territory) => territory.users, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'territory_id' })
  territory: ClassTerritory;

  @OneToMany(() => ClassCellsPersons, (cu) => cu.cell)
  cellsPersons?: ClassCellsPersons[];

  @OneToMany(() => ClassMeeting, (meeting) => meeting.cell)
  meetings?: ClassMeeting[];

}