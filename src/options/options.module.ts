import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUserType } from '../models/user_types/user_types.entity';
import { ClassTerritory } from '../models/territories/territories.entity';
import { ClassCellType } from 'src/models/cell_types/cell_types.entity';
import { ClassMeetingPlace } from '../models/meeting_places/meeting_places.entity';
import { ClassUser } from '../models/users/users.entity';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { ClassMemberType } from '../models/member_types/member_types.entity';
import { ClassCell } from '../models/cells/cells.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUserType , ClassTerritory, ClassCellType, ClassMeetingPlace, ClassUser, ClassMemberType, ClassCell ])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
