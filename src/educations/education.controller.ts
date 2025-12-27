import { Controller, Post, Body, Get, Put, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { EducationService } from './education.service';
import { ValidatorEducationDto } from '../models/educations/validator_education.dto';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';
// import { ClassUser } from 'src/models/users/users.entity';

// {
//   "consolidationLevel": "L1",
//   "leaderSchool": true,
//   "propheticSchool": false,
//   "person": 5 
// }

@Controller('education')
@UseGuards(AuthJwtGuard) // Protege todas las rutas de este controlador
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  // @Get()
  // async findAll(@Req() req) {
  //   // El usuario autenticado está disponible en req.user por el Guardián
  //   const currentUser: ClassUser = req.user;
  //   return this.educationService.findAll();
  // }

  @Get(':personId')
  async findOne(@Param('personId', ParseIntPipe) id: number) {
    return this.educationService.findByPersonId(id);
  }

  @Post()
  async create(
    @Body() dto: ValidatorEducationDto, 
    // @Req() req
  ) {
    // const currentUser: ClassUser = req.user;
    // Puedes pasar 'currentUser' al servicio si necesitas auditoría (quién creó el registro)
    return this.educationService.create(dto);
  }

  @Put(':personId')
  async update(
    @Param('personId', ParseIntPipe) id: number, 
    @Body() dto: ValidatorEducationDto,
    // @Req() req
  ) {
    // const currentUser: ClassUser = req.user;
    return this.educationService.update(id, dto);
  }

}

