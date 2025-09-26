import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUser } from '../models/users.entity';
import { ClassPerson } from '../models/persons.entity';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUser , ClassPerson])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}

/*
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClassUser  } from './users.entity';
import { ClassPerson } from '../persons/persons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUser , ClassPerson])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
*/

/*
POST /users/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "secret123",
  "person": {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "M",
    "birthDate": "1990-01-01"
  }
}
*/