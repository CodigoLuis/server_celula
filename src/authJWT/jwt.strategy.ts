import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from './jwt.service';
import { ClassUser } from '../models/users/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'Lu4nferg0V1rafpUptos',
    });
    
  }

  async validate(payload: { id: number; username: string; type?: string }): Promise<ClassUser > {
    try {
      const user: ClassUser  = await this.jwtService.validatePayload(payload);

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Token inválido');
    }
  }
}