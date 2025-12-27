import { Controller, Post, Body, Put, Param, UseGuards, Req, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { ValidatorPersonDto } from '../models/persons/validator_person.dto';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';

@Controller('person')
@UseGuards(AuthJwtGuard)
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('existing')
  async existing(@Body() data: { idNumber: string }) {
    const result = await this.personService.queryDataByIdNumberPerson(data.idNumber);
    return { data: result, existing: !!result };
  }

  @Post('selectDataById')
  async selectDataById(@Body() data: { id: number }) {
    const result = await this.personService.queryDataById(data.id);
    return { data: result, existing: !!result };
  }

  @Post('register')
  async register(@Body(ValidationPipe) dto: ValidatorPersonDto) {
    return this.personService.registerPerson(dto);
  }

  @Put('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: ValidatorPersonDto) {
    return this.personService.updatePerson(id, dto);
  }

  @Post('get-list')
  async getList() {
    return this.personService.getListOfPeople();
  }
  
}