import { Controller, Post, Body } from '@nestjs/common';
import { PersonService } from './person.service';
import { ClassUser } from '../models/users.entity';
import { ClassPerson } from '../models/persons.entity';

interface RegisterUserDto {
  username: string;
  password: string;
  // otros campos de usuario
  person: {
    firstName: string;
    lastName: string;
    gender?: string;
    birthDate?: string;
    // otros campos de persona
  };
}

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('register')
  async registerUser (@Body() registerUserDto: RegisterUserDto): Promise<any> {
    const { person, ...userData } = registerUserDto;
    return this.personService.registerUserWithPerson(userData, person);
  }

}

/*
// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClassUser  } from './users.entity';
import { ClassPerson } from '../persons/persons.entity';

class RegisterUser Dto {
  username: string;
  password: string;
  // otros campos de usuario

  person: {
    firstName: string;
    lastName: string;
    gender?: string;
    birthDate?: string;
    // otros campos de persona
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser (@Body() registerUser Dto: RegisterUser Dto): Promise<ClassUser > {
    const { person, ...userData } = registerUser Dto;
    return this.usersService.registerUser WithPerson(userData, person);
  }
}
*/
