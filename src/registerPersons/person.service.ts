import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClassUser } from '../models/users.entity';
import { ClassPerson } from '../models/persons.entity';
import { ClassUserType } from 'src/models/user_types.entity';
import { ClassTerritory } from 'src/models/territories.entity';


@Injectable()
export class PersonService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ClassUser)
    private readonly userRepository: Repository<ClassUser>,
    @InjectRepository(ClassPerson)
    private readonly personRepository: Repository<ClassPerson>,
  ) { }

  // async registerPerson() {

  //   return false;
  // }

  async registerUserWithPerson(
    userData: Partial<ClassUser>,
    personData: Partial<ClassPerson>,
  ): Promise<ClassUser> {

    return this.dataSource.transaction(async (manager) => {

      // Validar si username ya existe
      const existingUser = await manager.findOne(ClassUser, {
        where: { username: userData.username },
      });

      if (existingUser) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }

      // Validar si idNumber ya existe (solo si idNumber fue enviado)
      if (personData.idNumber) {
        
        const existingPerson = await manager.findOne(ClassPerson, {
          where: { idNumber: personData.idNumber },
        });

        if (existingPerson) {
          throw new ConflictException('El número de identificación ya está registrado');
        }

      }

      const now = new Date();
      Object.assign(personData, { createdAt: now });

      // Crear y guardar persona
      const person = manager.create(ClassPerson, personData);
      const savedPerson = await manager.save(person);

      // Encriptar la contraseña si existe
      let hashedPassword: string | undefined = undefined;
      if (userData.password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      }

      // Aquí debes obtener las entidades userType y territory si son relaciones
      // Ejemplo (ajusta según tus repositorios y entidades):
      const userType = await manager.findOneOrFail(ClassUserType, { where: { id: 'LI' } });
      const territory = await manager.findOneOrFail(ClassTerritory, { where: { id: 'RD' } });

      Object.assign(userData, {
        password: hashedPassword,
        active: true,
        createdAt: now,
        person: savedPerson,
        userType: userType,
        territory: territory
      });

      // Crear usuario y asignar persona y relaciones
      const user = manager.create(ClassUser, userData);

      return manager.save(user);
    });

  }

}


/*
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ClassUser  } from './users.entity';
import { ClassPerson } from '../persons/persons.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ClassUser )
    private readonly userRepository: Repository<ClassUser >,
    @InjectRepository(ClassPerson)
    private readonly personRepository: Repository<ClassPerson>,
  ) {}

  async registerUser WithPerson(
    userData: Partial<ClassUser >,
    personData: Partial<ClassPerson>,
  ): Promise<ClassUser > {
    return this.dataSource.transaction(async (manager) => {
      // Crear y guardar persona
      const person = manager.create(ClassPerson, personData);
      const savedPerson = await manager.save(person);

      // Crear usuario y asignar persona
      const user = manager.create(ClassUser , {
        ...userData,
        person: savedPerson,
      });

      // Aquí puedes agregar lógica para encriptar password, etc.

      return manager.save(user);
    });
  }
}

*/