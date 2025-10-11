import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClassPerson } from '../models/persons/persons.entity';
import { ValidatorPersonDto } from '../models/persons/validator_person.dto';
import { ClassUser } from '../models/users.entity';
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


  async existingPerson(idNumber: string) {
    const existing = await this.personRepository.findOne({
      where: { idNumber: idNumber },
    });
    return existing;
  }


  async registerPerson(validatorPersonDto: ValidatorPersonDto): Promise<ClassPerson> {

    const existing = await this.existingPerson(validatorPersonDto.idNumber);

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

      // Obtener las entidades userType y territory 
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
