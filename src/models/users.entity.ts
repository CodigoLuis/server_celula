import { ClassPerson } from './persons/persons.entity';
import { ClassTerritory } from './territories.entity';
import { ClassUserType } from './user_types.entity';
import { ClassCell } from './cells.entity';
import { ClassTitle } from './titles.entity';
import { ClassMeetingPlace } from './meeting_places.entity';
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

@Entity('users')
export class ClassUser  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  username: string;

  @Column({ length: 65 })
  password: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassUser , (user) => user.subordinates, { nullable: true })
  @JoinColumn({ name: 'leader_id' })
  leader?: ClassUser ;

  @OneToMany(() => ClassUser , (user) => user.leader)
  subordinates?: ClassUser [];

  @ManyToOne(() => ClassPerson, (person) => person.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person: ClassPerson;

  @ManyToOne(() => ClassUserType, (userType) => userType.users, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_type_id' })
  userType: ClassUserType;

  @ManyToOne(() => ClassTerritory, (territory) => territory.users, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'territory_id' })
  territory: ClassTerritory;

  @OneToMany(() => ClassCell, (cell) => cell.user)
  cells?: ClassCell[];

  @OneToMany(() => ClassTitle, (title) => title.user)
  titles?: ClassTitle[];

  @OneToMany(() => ClassMeetingPlace, (place) => place.user)
  meetingPlaces?: ClassMeetingPlace[];

  @OneToMany(() => ClassMeeting, (meeting) => meeting.user)
  meetings?: ClassMeeting[];
}