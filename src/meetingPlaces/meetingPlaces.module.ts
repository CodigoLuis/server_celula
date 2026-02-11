import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUser } from '../models/users/users.entity';
import { ClassMeetingPlace } from '../models/meeting_places/meeting_places.entity';
import { MeetingPlacesService } from './meetingPlaces.service';
import { MeetingPlacesController } from './meetingPlaces.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUser , ClassMeetingPlace])],
  controllers: [MeetingPlacesController],
  providers: [MeetingPlacesService],
})
export class MeetingPlacesModule {}
