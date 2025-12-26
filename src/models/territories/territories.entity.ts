import { ClassUser } from '../users/users.entity';
import { ClassCell } from '../cells/cells.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';

@Entity('territories')
export class ClassTerritory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 17 })
  name: string;

  @Column()
  male: boolean;

  @Column({ length: 7, nullable: true })
  color?: string;

  @OneToMany(() => ClassUser, (user) => user.territory)
  users?: ClassUser[];

  @OneToMany(() => ClassCell, (cell) => cell.territory)
  cells?: ClassCell[]; 
}