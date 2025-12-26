import { ClassUser } from '../users/users.entity';

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  PrimaryGeneratedColumn, // Necesario para el 'id' serial
} from 'typeorm';
 
@Entity('user_types')
export class ClassUserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 150 })
  description: string;

  @OneToMany(() => ClassUser, (user) => user.userType)
  users?: ClassUser[];
}