import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ClassUser } from '../models/users/users.entity';
import { ClassPerson } from '../models/persons/persons.entity';
import { ValidatorUserDto } from '../models/users/validator_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ClassUser)
    private readonly userRepository: Repository<ClassUser>,
    @InjectRepository(ClassPerson)
    private readonly personRepository: Repository<ClassPerson>,
  ) { }

  async existingUserName(userName: string) {
    return await this.userRepository.findOne({
      where: { username: userName },
      select: ['id', 'username'],
    });
  }

  async queryDataById(idUser: number) {
    return await this.userRepository.findOne({
      where: { id: idUser }
    });
  }

  async registerUser(dto: ValidatorUserDto, authenticatedUser: ClassUser): Promise<ClassUser> {
    const exists = await this.existingUserName(dto.username);
    if (exists) throw new ConflictException('El nombre de usuario ya está en uso');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userData: DeepPartial<ClassUser> = {
      username: dto.username,
      password: hashedPassword,
      email: dto.email,
      active: true,
      leader: { id: authenticatedUser.id },
      person: { id: dto.person },
      userType: { id: dto.userType },
      territory: { id: dto.territory },
    };

    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, dto: ValidatorUserDto): Promise<ClassUser> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);

    let password = userToUpdate.password;
    if (dto.password && dto.password !== userToUpdate.password) {
      password = await bcrypt.hash(dto.password, 10);
    }

    const userDataUpdate: DeepPartial<ClassUser> = {
      username: dto.username,
      email: dto.email,
      password: password,
      active: dto.active,
      person: { id: dto.person },
      userType: { id: dto.userType },
      territory: { id: dto.territory },
      leader: dto.leader ? { id: dto.leader } : undefined,
    };

    this.userRepository.merge(userToUpdate, userDataUpdate);
    return await this.userRepository.save(userToUpdate);
  }

  async getListOfUser(user: ClassUser): Promise<ClassUser[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.userType', 'userType')
      .leftJoinAndSelect('user.territory', 'territory')
      .leftJoinAndSelect('user.leader', 'leader')
      .select([
        'user.id', 'user.active', 'user.username', 'user.email', 'user.createdAt',
        'territory.id', 'territory.name', 'territory.color',
        'userType.id', 'userType.title',
        'person.firstName', 'person.lastName', 'person.gender', 'person.phone', 'person.birthDate', 'person.idNumber', 'person.photo',
        'leader.id', 'leader.username',
      ])
      .getMany();
  }

  async profileDetails(user: { id: number }): Promise<ClassUser> {
    const dataUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['person', 'userType', 'territory', 'leader'],
    });

    if (!dataUser) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return dataUser;
  }

  async updateAvatar(idUser: number, fileName: string): Promise<String> {
    const user = await this.userRepository.findOne({
      where: { id: idUser },
      relations: ['person'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (!user.person) throw new NotFoundException('El usuario no tiene una persona asociada');

    user.person.photo = fileName;
    await this.personRepository.save(user.person);

    return `Exito, foto de perfil actualizada`;
  }


} 