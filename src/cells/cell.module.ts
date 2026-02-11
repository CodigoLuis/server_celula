import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { ClassUser } from '../models/users/users.entity';
import { ClassMeetingPlace } from '../models/meeting_places/meeting_places.entity';
import { ClassCell } from '../models/cells/cells.entity'; 
import { ClassPredeterminedMeetingPlace } from '../models/predetermined_meeting_places/predetermined_meeting_places.entity'; 

// Componentes del Módulo
import { CellService } from './cell.service';
import { CellController } from './cell.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassCell, 
      ClassPredeterminedMeetingPlace, 
      ClassUser, 
      ClassMeetingPlace
    ])
  ],
  controllers: [CellController],
  providers: [CellService],
  // Si planeas usar CellService en otros módulos (como Reportes), recuerda exportarlo:
  // exports: [CellService] 
})
export class CellModule { }