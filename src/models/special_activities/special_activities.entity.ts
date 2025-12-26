import { ClassMeeting } from '../meetings/meetings.entity';
import { ClassMeetingPlace } from '../meeting_places/meeting_places.entity';
import { 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn, // ¡Cambiado! Usamos PrimaryGeneratedColumn
  Column, // Importamos Column para las FKs
} from 'typeorm';

@Entity('special_activities')
export class ClassSpecialActivity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'meeting_id' })
  meetingId: number;

  @Column({ name: 'meeting_place_id'})
  meetingPlaceId: number;

  @ManyToOne(() => ClassMeeting, (meeting) => meeting.specialActivities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'meeting_id' })
  meeting: ClassMeeting;

  @ManyToOne(() => ClassMeetingPlace, (place) => place.specialActivities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'meeting_place_id' })
  meetingPlace: ClassMeetingPlace;
}