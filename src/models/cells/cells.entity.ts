import { ClassCellType } from '../cell_types/cell_types.entity';
import { ClassUser } from '../users/users.entity';
import { ClassCellsPersons } from '../cells_persons/cells_persons.entity'; // Asegúrate que el nombre del archivo sea cells_persons.entity.ts
import { ClassMeeting } from '../meetings/meetings.entity';
import { ClassTerritory } from '../territories/territories.entity';
// import { ClassMeetingPlace } from '../meeting_places/meeting_places.entity'; // Importado
import { ClassPredeterminedMeetingPlace } from '../predetermined_meeting_places/predetermined_meeting_places.entity'; // Importado
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

  @Column({ length: 20 })
  title: string;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'start_date' })
  startDate?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => ClassCellType, (cellType) => cellType.cells, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cell_type_id' })
  cellType: ClassCellType;

  @ManyToOne(() => ClassUser, (user) => user.cells, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: ClassUser;

  @ManyToOne(() => ClassTerritory, (territory) => territory.cells, { onDelete: 'RESTRICT' }) // Corregido: territorio.cells
  @JoinColumn({ name: 'territory_id' })
  territory: ClassTerritory;

  @OneToMany(() => ClassCellsPersons, (cu) => cu.cell)
  cellsPersons?: ClassCellsPersons[];

  @OneToMany(() => ClassMeeting, (meeting) => meeting.cell)
  meetings?: ClassMeeting[];

  @OneToMany(() => ClassPredeterminedMeetingPlace, (pmp) => pmp.cell)
  predeterminedMeetingPlaces?: ClassPredeterminedMeetingPlace[];
}