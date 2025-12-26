import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ClassEducation } from '../models/educations/educations.entity';

import { ValidatorPersonDto } from '../models/persons/validator_person.dto';

@Injectable()
export class EducationService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ClassEducation)
    private readonly userRepository: Repository<ClassEducation>,
  ) { }


  // async getListOfPeople(user): Promise<ClassPerson[]> {

  //   // const listPeople = await this.personRepository.find({ where: { gender: user.person.gender } });
  //   const people = await this.personRepository
  //     .createQueryBuilder('person')
  //     .leftJoin('person.users', 'user')
  //     .addSelect('user.id')
  //     .leftJoin('person.education', 'education')
  //     .addSelect(['education.id', 'education.consolidationLevel', 'education.leaderSchool', 'education.propheticSchool'])
  //     .getMany();

  //   const formattedPeople: any = [];

  //   for (const person of people) {

  //     const userId = person.users && person.users.length > 0
  //       ? true
  //       : false;

  //     const personEntry: any = { ...person };
  //     personEntry.isUser = userId;

  //     delete personEntry.users;

  //     formattedPeople.push(personEntry);
  //   }

  //   return formattedPeople;

  // }


}
