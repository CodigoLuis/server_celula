import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ClassMeetingPlace } from '../models/meeting_places/meeting_places.entity'; // Ajusta la ruta
import { ClassUser } from '../models/users/users.entity';
import { ValidatorMeetingPlaceDto } from '../models/meeting_places/validator_meeting_place.dto'; // Crea este DTO

@Injectable()
export class MeetingPlacesService {
  constructor(
    @InjectRepository(ClassMeetingPlace)
    private readonly meetingRepository: Repository<ClassMeetingPlace>,
  ) {}

  async registerMeetingPlace(dto: ValidatorMeetingPlaceDto, authenticatedUser: ClassUser): Promise<ClassMeetingPlace> {
    const meetingData: DeepPartial<ClassMeetingPlace> = {
      title: dto.title,
      details: dto.details,
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
      user: { id: authenticatedUser.id },
    };

    const newPlace = this.meetingRepository.create(meetingData);
    return await this.meetingRepository.save(newPlace);
  }

  // async updateMeetingPlace(id: number, dto: ValidatorMeetingPlaceDto): Promise<ClassMeetingPlace> {
  //   const place = await this.meetingRepository.findOne({ where: { id } });
  //   if (!place) throw new NotFoundException(`Lugar de reunión con ID ${id} no encontrado.`);

  //   const updateData: DeepPartial<ClassMeetingPlace> = {
  //     title: dto.title,
  //     details: dto.details,
  //     address: dto.address,
  //     latitude: dto.latitude,
  //     longitude: dto.longitude,
  //     updatedAt: new Date(), // Seteamos la fecha de actualización
  //   };

  //   this.meetingRepository.merge(place, updateData);
  //   return await this.meetingRepository.save(place);
  // }

  async getMeetingPlaces(): Promise<ClassMeetingPlace[]> {
    return await this.meetingRepository
      .createQueryBuilder('meeting')
      .leftJoinAndSelect('meeting.user', 'user')
      .select([
        'meeting.id',
        'meeting.title',
        'meeting.details',
        'meeting.address',
        'meeting.latitude',
        'meeting.longitude',
        'meeting.createdAt',
        'user.id',
        'user.username',
      ])
      .getMany();
  }

  // async deleteMeetingPlace(id: number): Promise<{ message: string }> {
  //   const result = await this.meetingRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`No se pudo eliminar: Lugar con ID ${id} no existe.`);
  //   }
  //   return { message: `Lugar de reunión con ID ${id} eliminado correctamente.` };
  // }
}