import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm';
import { ClassUser } from '../models/users/users.entity';
// import * as bcrypt from 'bcrypt';
// import { ClassPerson } from '../models/persons/persons.entity';
// import { ValidatorPersonDto } from '../models/persons/validator_person.dto';
import { ValidatorUserDto } from '../models/users/validator_user.dto';

// import { ClassUserType } from 'src/models/user_types.entity';
// import { ClassTerritory } from 'src/models/territories.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ClassUser)
    private readonly userRepository: Repository<ClassUser>,
  ) { }

  async existingUserName(userName: string) {
    const existing = await this.userRepository.findOne({
      where: { username: userName }, select: ['username'],
    });
    return existing;
  }

  async registerUser(validatorUserDto: ValidatorUserDto, authenticatedData): Promise<ClassUser> {
    // Transforma el DTO a DeepPartial<ClassUser>
    const userData: DeepPartial<ClassUser> = {
      username: validatorUserDto.username,
      password: validatorUserDto.password,
      email: validatorUserDto.email,
      active: validatorUserDto.active,
      // Mapea las relaciones: Convierte IDs en objetos parciales para que TypeORM los entienda
      leader: authenticatedData.id,
      person: { id: validatorUserDto.person },
      userType: { id: validatorUserDto.userType },
      territory: { id: validatorUserDto.territory },
    };
    // Crea y guarda la entidad con los datos transformados
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async queryDataById(idUser: number) {
    const existing = await this.userRepository.findOne({
      where: { id: idUser }
    });
    return existing;
  }

  async updateUser(
    id: number,
    validatorUserDto: ValidatorUserDto,
  ): Promise<ClassUser> {

    const userToUpdate = await this.userRepository.findOne({
      where: { id: id },
    });

    // si el usuario no existe
    if (!userToUpdate) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    const userDataUpdate: DeepPartial<ClassUser> = {
      username: validatorUserDto.username,
      email: validatorUserDto.email,
      active: validatorUserDto.active,
      person: { id: validatorUserDto.person },
      userType: { id: validatorUserDto.userType },
      territory: { id: validatorUserDto.territory },
    };

    this.userRepository.merge(userToUpdate, userDataUpdate);

    return await this.userRepository.save(userToUpdate);
  }

  async getListOfUser(user): Promise<ClassUser[]> {

    // const idTerritory = user.territory.id;

    const listUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.userType', 'userType')
      .leftJoinAndSelect('user.territory', 'territory')
      .leftJoinAndSelect('user.leader', 'leader')
      .select([
        'user.id',
        'user.active',
        'user.username',
        'territory.id',
        'territory.name',
        'territory.male',
        'territory.color',
        'userType.id',
        'userType.title',
        'person.firstName',
        'person.lastName',
        'person.gender',
        'person.birthDate',
        'leader.id',
        'leader.username',
      ])
      // .where('territory.id = :id', { id: idTerritory })
      .getMany();

    return listUser;
  }

  async profileDetails(user: { id: number }): Promise<ClassUser> {

    const dataUser = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.username'
      ])
      .leftJoinAndSelect('user.person', 'person')
      .addSelect([
        'person.firstName',
        'person.lastName',
        'person.gender',
        'person.photo',
        'person.maritalStatus',
        'person.idNumber',
        'person.educationLevel',
        'person.phone',
        'person.address',
        'person.birthDate',
      ])
      .leftJoinAndSelect('user.userType', 'userType')
      .addSelect([
        'userType.id',
        'userType.title'
      ])
      .leftJoinAndSelect('user.territory', 'territory')
      .addSelect([
        'territory.id',
        'territory.name',
        'territory.male',
        'territory.color',
      ])
      // .leftJoinAndSelect('user.leader', 'leader')
      // .addSelect([
      //   'leader.id',
      //   'leader.username',
      // ])
      // // .addSelect('leader.id', 'id_leader')
      // // .addSelect('leader.username', 'username_leader')
      .where('user.id = :id', { id: user.id })
      .getOne();

    // if (!dataUser) {
    //     return null; 
    // }

    return dataUser as ClassUser; // Asume el casteo si es necesario
  }

}
