import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
import { ValidatorPersonDto } from '../models/persons/validator_person.dto';
import { AuthJwtGuard } from '../authJWT/auth-jwt.guard';

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
export class PersonController {
  constructor(private readonly personService: PersonService) { }


  @Post('existing')
  @UseGuards(AuthJwtGuard)
  async existing(@Body() data: { idNumber: string }) {
    const result = await this.personService.existingPerson(data.idNumber);
    return { data: result, existing: result ? true : false }
  }


  @Post('register')
  @UseGuards(AuthJwtGuard)
  async register(@Body(ValidationPipe) validatorPersonDto: ValidatorPersonDto) {
    return this.personService.registerPerson(validatorPersonDto);
  }


  @Post('registerUserWithPerson')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    const { person, ...userData } = registerUserDto;
    return this.personService.registerUserWithPerson(userData, person);
  }

}
