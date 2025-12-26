import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClassPerson } from '../models/persons/persons.entity';
import { ValidatorPersonDto } from '../models/persons/validator_person.dto';
import { ClassUser } from '../models/users/users.entity';
import { ClassUserType } from 'src/models/user_types/user_types.entity';
import { ClassTerritory } from 'src/models/territories/territories.entity';


@Injectable()
export class PersonService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ClassUser)
    private readonly userRepository: Repository<ClassUser>,
    @InjectRepository(ClassPerson)
    private readonly personRepository: Repository<ClassPerson>,
  ) { }


  async queryDataByIdNumberPerson(idNumber: string) {
    const existing = await this.personRepository.findOne({
      where: { idNumber: idNumber },
    });

    let isUser: boolean = false

    if (existing) {

      const existingUser = await this.userRepository.findOne({
        where: { person: { id: existing.id } },
      });

      if (existingUser) isUser = true;

    }

    if (isUser === true) return { ...existing, isUser: isUser };
    else return existing;

  }

  async queryDataById(idPerson: number) {

    const data = await this.personRepository.findOne({
      where: { id: idPerson },
    });

    let isUser: boolean = false

    if (data) {

      const existingUser = await this.userRepository.findOne({
        where: { person: { id: data.id } },
      });

      if (existingUser) isUser = true;

    }

    if (isUser === true) return { ...data, isUser: isUser };
    else return data;

  }

  async registerPerson(validatorPersonDto: ValidatorPersonDto): Promise<ClassPerson> {

    const existing = await this.queryDataByIdNumberPerson(validatorPersonDto.idNumber);

    if (existing) {
      throw new ConflictException(
        `El número de identificación "${validatorPersonDto.idNumber}" ya está registrado en el sistema.`,
      );
    }

    // Crea una nueva instancia de la entidad
    const person = this.personRepository.create(validatorPersonDto);

    // Guarda en la base de datos
    return await this.personRepository.save(person);

    // {
    //   "firstName": "Juan00",
    //   "lastName": "Pérez00",
    //   "gender": "M",
    //   "idNumber": "123456789012", 
    //   "maritalStatus": "Soltero",
    //   "phone": "123456789",
    //   "birthDate": "1990-01-01"
    // }

  }

  // async updatePerson(
  //   idToUpdate: number,
  //   updateDataDto: ValidatorPersonDto,
  // ): Promise<ClassPerson> {

  //   const existingPerson = await this.queryDataById(idToUpdate);

  //   if (!existingPerson) {
  //     throw new NotFoundException(
  //       `La persona no se encuentra registrada.`,
  //     );
  //   }

  //   const updatedPerson = Object.assign(existingPerson, updateDataDto);
  //   // Alternativa: const updatedPerson = this.personRepository.merge(existingPerson, updateDataDto);

  //   return await this.personRepository.save(updatedPerson);
  // }

  async getListOfPeople(user): Promise<ClassPerson[]> {

    // const listPeople = await this.personRepository.find({ where: { gender: user.person.gender } });
    const people = await this.personRepository
      .createQueryBuilder('person')
      .leftJoin('person.users', 'user')
      .addSelect('user.id')
      .leftJoin('person.education', 'education')
      .addSelect(['education.id', 'education.consolidationLevel', 'education.leaderSchool', 'education.propheticSchool'])
      .getMany();

    const formattedPeople: any = [];

    for (const person of people) {

      const userId = person.users && person.users.length > 0
        ? true
        : false;

      const personEntry: any = { ...person };
      personEntry.isUser = userId;

      delete personEntry.users;

      formattedPeople.push(personEntry);
    }

    return formattedPeople;

  }


}
