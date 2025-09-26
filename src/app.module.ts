import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // ← NUEVO: Para cargar .env globalmente
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities (mantengo tu lista completa)
import { ClassPerson } from './models/persons.entity';
import { ClassTerritory } from './models/territories.entity';
import { ClassUserType } from './models/user_types.entity';
import { ClassCell } from './models/cells.entity';
import { ClassCellsUsers } from './models/cells_users.entity';
import { ClassTitle } from './models/titles.entity';
import { ClassMeetingPlace } from './models/meeting_places.entity';
import { ClassMeeting } from './models/meetings.entity';
import { ClassAttendanceType } from './models/attendance_types.entity';
import { ClassInvited } from './models/invited.entity';
import { ClassAttendance } from './models/attendances.entity';
import { ClassCellType } from './models/cell_types.entity';
import { ClassUser } from './models/users.entity';  // Tu entity principal
import { ClassMemberType } from './models/member_types.entity';
import { ClassMeetingDetail } from './models/meeting_details.entity';
import { ClassEducation } from './models/education.entity';
// Modules y Controllers
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './registerPersons/person.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ← NUEVO: Carga .env (para JWT_SECRET y DB vars)

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',  // ← AJUSTADO: Usa .env con fallback
      port: parseInt(process.env.DB_PORT || '5432'),  // ← AJUSTADO: parseInt para port
      username: process.env.DB_USERNAME || 'postgres',  // ← AJUSTADO: Usa .env
      password: process.env.DB_PASSWORD || '123456789',  // ← AJUSTADO: Usa .env (¡cámbialo en prod!)
      database: process.env.DB_DATABASE || 'reuniones',  // ← AJUSTADO: Usa .env
      entities: [
        ClassPerson, ClassEducation, ClassTerritory, ClassUserType,
        ClassCell, ClassCellsUsers, ClassTitle,
        ClassMeetingPlace, ClassMeeting, ClassAttendanceType,
        ClassInvited, ClassAttendance, ClassCellType,
        ClassUser, ClassMemberType, ClassMeetingDetail  // ← Incluye ClassUser  y todas
      ],
      synchronize: false,  // ← MANTENIDO: Bueno para prod; pon true solo en dev
      // autoLoadEntities: true,  // Opcional: Si quieres auto-cargar más entities sin listar
    }),

    AuthModule,  // ← MANTENIDO: Incluye authJWT (JwtService global, strategy, guard)
    PersonModule,  // ← MANTENIDO: Tu módulo de personas
  ],
  controllers: [],  
  providers: [],
})
export class AppModule { }