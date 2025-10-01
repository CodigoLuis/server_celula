import { ClassUser  } from './users.entity';
import { ClassCell } from './cells.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('territories')
export class ClassTerritory {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 17 })
  name: string;

  @Column()
  male: boolean;

  @OneToMany(() => ClassUser , (user) => user.territory)
  users?: ClassUser [];

  @OneToMany(() => ClassCell , (cell) => cell.territory)
  cells?: ClassCell [];
}