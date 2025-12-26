import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUser } from '../models/users/users.entity';
import { ClassPerson } from '../models/persons/persons.entity';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUser , ClassPerson])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class PersonModule {}
