import { ClassCellsUsers } from './cells_users.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('member_types')
export class ClassMemberType {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @OneToMany(() => ClassCellsUsers, (cu) => cu.memberType)
  cellsUsers?: ClassCellsUsers[];
}