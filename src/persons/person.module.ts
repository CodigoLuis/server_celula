import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUser } from '../models/users.entity';
import { ClassPerson } from '../models/persons/persons.entity';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUser , ClassPerson])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
