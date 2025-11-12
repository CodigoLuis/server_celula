import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
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


  async getListOfUser(user): Promise<ClassUser[]> {

    const idTerritory = user.territory.id;

    const listUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.userType', 'userType')
      .leftJoinAndSelect('user.territory', 'territory')
      .select([
        'user.id',
        'user.active',
        'user.username',
        'territory.id',
        'territory.name',
        'territory.male',
        'userType.title',
        'person.firstName',
        'person.lastName',
        'person.gender',
      ])
      // .where('territory.id = :id', { id: idTerritory })
      .getMany();

    return listUser;
  }

}
