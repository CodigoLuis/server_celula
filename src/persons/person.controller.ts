import { Controller, Post, Body, Req, ValidationPipe, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
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

  @Post('get-list')
  @UseGuards(AuthJwtGuard)
  async getList(@Req() req) {
    const user: ClassUser = req.user;

    return this.personService.getListOfPeople(user);
  }


  // @Post('registerUserWithPerson')
  // async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<any> {
  //   const { person, ...userData } = registerUserDto;
  //   return this.personService.registerUserWithPerson(userData, person);
  // }

}
