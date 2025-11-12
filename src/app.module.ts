import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // ← NUEVO: Para cargar .env globalmente
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities (mantengo tu lista completa)
import { ClassPerson } from './models/persons/persons.entity';
import { ClassTerritory } from './models/territories.entity';
import { ClassUserType } from './models/user_types.entity';
import { ClassCell } from './models/cells.entity';
import { ClassCellsPersons } from './models/cells_users.entity';
import { ClassTitle } from './models/titles.entity';
import { ClassMeetingPlace } from './models/meeting_places.entity';
import { ClassMeeting } from './models/meetings.entity';
import { ClassAttendanceType } from './models/attendance_types.entity';
import { ClassAttendance } from './models/attendances.entity';
import { ClassCellType } from './models/cell_types.entity';
import { ClassUser } from './models/users/users.entity';  // Tu entity principal
import { ClassMemberType } from './models/member_types.entity';
import { ClassMeetingDetail } from './models/meeting_details.entity';
import { ClassEducation } from './models/education.entity';
// Modules y Controllers
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './persons/person.module';
import { OptionsModule } from './options/options.module';
import { UserModule } from './user/user.module';

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
        ClassCell, ClassCellsPersons, ClassTitle,
        ClassMeetingPlace, ClassMeeting, ClassAttendanceType,
        ClassAttendance, ClassCellType,
        ClassUser, ClassMemberType, ClassMeetingDetail  // ← Incluye ClassUser  y todas
      ],
      synchronize: false,  // ← MANTENIDO: Bueno para prod; pon true solo en dev
      // autoLoadEntities: true,  // Opcional: Si quieres auto-cargar más entities sin listar
    }),

    AuthModule,  
    PersonModule, 
    OptionsModule,
    UserModule,
  ],
  controllers: [],  
  providers: [],
})
export class AppModule { }