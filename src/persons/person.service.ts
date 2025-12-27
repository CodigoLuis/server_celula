import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassPerson } from '../models/persons/persons.entity';
import { ClassUser } from '../models/users/users.entity';
import { ValidatorPersonDto } from '../models/persons/validator_person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(ClassUser)
    private readonly userRepository: Repository<ClassUser>,
    @InjectRepository(ClassPerson)
    private readonly personRepository: Repository<ClassPerson>,
  ) {}

  private async findPersonWithUserStatus(where: object) {
    const person = await this.personRepository.findOne({
      where,
      relations: ['users'], 
    });
    if (!person) return null;

    const { users, ...data } = person;
    return { ...data, isUser: !!users };
  }

  async queryDataByIdNumberPerson(idNumber: string) {
    return this.findPersonWithUserStatus({ idNumber });
  }

  async queryDataById(id: number) {
    return this.findPersonWithUserStatus({ id });
  }

  async registerPerson(dto: ValidatorPersonDto): Promise<ClassPerson> {
    const existing = await this.personRepository.findOne({ where: { idNumber: dto.idNumber } });
    if (existing) throw new ConflictException('La identificación ya existe.');

    const person = this.personRepository.create(dto);
    return await this.personRepository.save(person);
  }

  async updatePerson(id: number, dto: ValidatorPersonDto): Promise<ClassPerson> {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) throw new NotFoundException('Persona no encontrada');
    
    const updated = this.personRepository.merge(person, dto);
    return await this.personRepository.save(updated);
  }

  async getListOfPeople(): Promise<any[]> {
    const people = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.users', 'user')
      .leftJoinAndSelect('person.education', 'education')
      .getMany();

    return people.map(p => {
      const { users, ...data } = p;
      return { ...data, isUser: !!users };
    });
  }
  
}