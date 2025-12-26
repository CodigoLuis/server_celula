import { Controller, Post, Body, Req, ValidationPipe, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { ValidatorPersonDto } from '../models/persons/validator_person.dto';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';
import { ClassUser } from 'src/models/users/users.entity';

interface RegisterUserDto {
  username: string;
  password: string;
  person: {
    firstName: string;
    lastName: string;
    gender?: string;
    birthDate?: string;
  };
}

@Controller('person')
export class EducationController {
  constructor(private readonly personService: EducationService) { }


  // @Post('register')
  // @UseGuards(AuthJwtGuard)
  // async register(@Body(ValidationPipe) validatorPersonDto: ValidatorPersonDto) {
  //   return this.personService.registerPerson(validatorPersonDto);
  // }

}
