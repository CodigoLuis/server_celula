import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { MeetingPlacesService } from './meetingPlaces.service';
import { ValidatorMeetingPlaceDto } from '../models/meeting_places/validator_meeting_place.dto'; // Asegúrate de crear este DTO
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';
import { ClassUser } from '../models/users/users.entity';

@Controller('meeting-places')
@UseGuards(AuthJwtGuard)
export class MeetingPlacesController {
  constructor(private readonly meetingPlacesService: MeetingPlacesService) { }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true, groups: ['create'] }))
    dto: ValidatorMeetingPlaceDto,
    @Req() req
  ) {
    const authUser: ClassUser = req.user;

    return this.meetingPlacesService.registerMeetingPlace(dto, authUser);
  }

  // @Put('update/:id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(new ValidationPipe({ whitelist: true, groups: ['update'] })) 
  //   dto: ValidatorMeetingPlaceDto
  // ) {
  //   return this.meetingPlacesService.updateMeetingPlace(id, dto);
  // }

  @Get('list')
  async getList() {
    return this.meetingPlacesService.getMeetingPlaces();
  }

  // @Delete('delete/:id')
  // async delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.meetingPlacesService.deleteMeetingPlace(id);
  // }
}