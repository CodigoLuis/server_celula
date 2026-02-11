import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // ← NUEVO: Para cargar .env globalmente
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities (mantengo tu lista completa)
import { ClassPerson } from './models/persons/persons.entity';
import { ClassUser } from './models/users/users.entity';
import { ClassTerritory } from './models/territories/territories.entity';
import { ClassUserType } from './models/user_types/user_types.entity';
import { ClassCell } from './models/cells/cells.entity';
import { ClassCellsPersons } from './models/cells_persons/cells_persons.entity';
import { ClassMeetingTitles } from './models/meeting_titles/meeting_titles.entity';
import { ClassMeetingPlace } from './models/meeting_places/meeting_places.entity';
import { ClassMeeting } from './models/meetings/meetings.entity';
import { ClassAttendanceType } from './models/attendance_types/attendance_types.entity';
import { ClassAttendance } from './models/attendances/attendances.entity';
import { ClassCellType } from './models/cell_types/cell_types.entity';
import { ClassMemberType } from './models/member_types/member_types.entity';
import { ClassMeetingDetail } from './models/meeting_details/meeting_details.entity';
import { ClassEducation } from './models/educations/educations.entity';
import { ClassPredeterminedMeetingPlace } from './models/predetermined_meeting_places/predetermined_meeting_places.entity';
import { ClassSpecialActivity } from './models/special_activities/special_activities.entity';
// Modules y Controllers
import { AuthModule } from './auths/auth.module';
import { PersonModule } from './persons/person.module';
import { OptionsModule } from './options/options.module';
import { UserModule } from './users/user.module';
import { EducationModule } from './educations/education.module';
import { MeetingPlacesModule } from './meetingPlaces/meetingPlaces.module';
import { CellModule } from './cells/cell.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Carga .env (para JWT_SECRET y DB vars)

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456789',
      database: process.env.DB_DATABASE || 'reuniones',
      entities: [
        ClassPerson, ClassEducation, ClassTerritory, ClassUserType,
        ClassCell, ClassCellsPersons, ClassMeetingTitles,
        ClassMeetingPlace, ClassMeeting, ClassAttendanceType,
        ClassAttendance, ClassCellType, ClassUser, ClassMemberType,
        ClassMeetingDetail, ClassPredeterminedMeetingPlace, ClassSpecialActivity
      ],
      synchronize: false,  // ← MANTENIDO: Bueno para prod; pon true solo en dev
      // autoLoadEntities: true,  // Opcional: Si quieres auto-cargar más entities sin listar
    }),

    AuthModule,
    PersonModule,
    OptionsModule,
    UserModule,
    EducationModule,
    MeetingPlacesModule,
    CellModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }