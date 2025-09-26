import { ClassUser  } from './users.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('user_types')
export class ClassUserType {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @OneToMany(() => ClassUser , (user) => user.userType)
  users?: ClassUser [];
}