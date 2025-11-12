import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  
import { ClassUser } from '../models/users/users.entity';  

interface dataUser {
  id: number;
  username: string;
  person: {
    firstName: string;
    lastName: string;
    gender: string;
  };
  userType: {
    title: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ClassUser)
    private userRepository: Repository<ClassUser>,
    private readonly jwtService: JwtService,  // ← Inyectado de authJWT
  ) { }

  async generateToken(user: dataUser) {
    const payload = { username: user.username, id: user.id, type: user.userType.title };

    return {
      access_token: this.jwtService.sign(payload),
      person: user.person,
      type: user.userType.title,
    };
  }

  async validateUser(username: string, password1: string): Promise<Omit<ClassUser, 'password' | 'active'> | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.userType', 'userType')
      .select([
        'user.id',
        'user.username',
        'user.password',
        'userType.title',
        'person.firstName',
        'person.lastName', 
      ])
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (user.active === false) {
      throw new UnauthorizedException('El usuario no esta activo');
    }

    // Usa bcrypt para comparación segura (activado)
    // const passwordValid = await bcrypt.compare(password1, user.password);
    // if (!passwordValid) {
    //   throw new UnauthorizedException('Contraseña incorrecta');
    // }

    if (password1 !== user.password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Retornamos el usuario sin el password y active
    const { password, active, ...result } = user;
    return result;
  }

  async authUser(username: string, id: number): Promise<ClassUser> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('user.userType', 'userType')
      .leftJoinAndSelect('user.territory', 'territory')
      .select([
        'user.id',
        'user.username',  
        'territory.id',  
        'territory.name',  
        'territory.male',  
        'userType.title',
        'person.firstName',
        'person.lastName',
        'person.gender',
      ])
      .where('user.id = :id', { id })  // ← id: number
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Usuario no Autenticado');
    }

    if (user.username !== username) {
      throw new UnauthorizedException('Usuario no Autenticado');
    }

    // Chequeo extra: active
    // if (!user.active) {
    //   throw new UnauthorizedException('Usuario no activo');
    // }

    return user;  // Retorna con joins
  }

}