import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ClassUserType } from 'src/models/user_types/user_types.entity';
import { ClassTerritory } from 'src/models/territories/territories.entity';

import { ClassCellType } from 'src/models/cell_types/cell_types.entity';
import { ClassMeetingPlace } from '../models/meeting_places/meeting_places.entity';
import { ClassUser } from '../models/users/users.entity';
import { ClassMemberType } from '../models/member_types/member_types.entity';
import { ClassCell } from '../models/cells/cells.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(ClassUserType)
    private readonly userTypeRepository: Repository<ClassUserType>,
    @InjectRepository(ClassTerritory)
    private readonly territoryRepository: Repository<ClassTerritory>,
    @InjectRepository(ClassCellType)
    private readonly cellTypeRepository: Repository<ClassCellType>,
    @InjectRepository(ClassMeetingPlace)
    private readonly meetingPlaceRepository: Repository<ClassMeetingPlace>,
    @InjectRepository(ClassUser)
    private readonly userRepository: Repository<ClassUser>,
    @InjectRepository(ClassMemberType)
    private readonly memberTypeRepository: Repository<ClassMemberType>,
    @InjectRepository(ClassCell)
    private readonly cellRepository: Repository<ClassCell>,

  ) { }

  async optionsUserType(): Promise<ClassUserType[]> {
    return await this.userTypeRepository.find();
  }

  async optionsTerritory(): Promise<ClassTerritory[]> {
    return await this.territoryRepository.find();
  }

  async optionsCellType(): Promise<ClassCellType[]> {
    return await this.cellTypeRepository.find();
  }
  //-----------------------------------------------------------------------------------------------
  async optionsMeetingPlace(): Promise<ClassMeetingPlace[]> {
    return await this.meetingPlaceRepository.find();
  }

  //   async optionsMeetingPlace(userIds: number | number[]): Promise<ClassMeetingPlace[]> {
  //   return await this.meetingPlaceRepository.find({
  //     where: {
  //       // Si userIds es un solo ID, funciona como '='
  //       // Si userIds es [1, 2], funciona como 'IN (1, 2)'
  //       user: Array.isArray(userIds) ? In(userIds) : userIds
  //     },
  //     order: {
  //       title: 'ASC' // Ordenar alfabéticamente ayuda a la legibilidad en el móvil
  //     }
  //   });
  // }

  async findByTwoUsers(id1: number, id2: number): Promise<ClassMeetingPlace[]> {
    return await this.meetingPlaceRepository.createQueryBuilder('mp')
      .where('mp.user_id = :id1 OR mp.user_id = :id2', { id1, id2 })
      .getMany();
  }
  //-----------------------------------------------------------------------------------------------

  async optionsUser(territoryId: number): Promise<any[]> {
    return await this.userRepository.createQueryBuilder('user')
      .innerJoin('user.person', 'person')
      .innerJoin('user.userType', 'userType')
      .select([
        'user.id',
        'user.username',
        'person.firstName',
        'person.lastName',
        'userType.title'
      ])
      .where('user.territory_id = :territoryId', { territoryId })
      .andWhere('user.active = :isActive', { isActive: true })
      .getRawMany(); // Usamos getRawMany para obtener un objeto plano más fácil de manejar
  }

  async optionsMemberType(): Promise<ClassCellType[]> {
    return await this.memberTypeRepository.find();
  }

  async optionsCells(territoryId: number): Promise<any[]> {
    return await this.cellRepository.createQueryBuilder('cell')
      .innerJoin('cell.territory', 'territory')
      .innerJoin('cell.cellType', 'cellType')
      .innerJoin('cell.user', 'user')
      .innerJoin('user.person', 'person')
      .select([
        'cell.id AS id',
        'cell.title AS title',
        'cellType.title AS type',
        'territory.name AS territoryName',
        'person.firstName AS leaderFirstName',
        'person.lastName AS leaderLastName'
      ])
      .where('cell.territory_id = :territoryId', { territoryId })
      .andWhere('cell.active = :isActive', { isActive: true })
      .getRawMany();
  }

}
