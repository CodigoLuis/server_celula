import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUser  } from '../models/users.entity';  // Tu entity
import { AuthService } from '../auth/auth.service';  // Tu service para authUser 

import { JwtService } from './jwt.service';  // Custom para validaciones
import { JwtStrategy } from './jwt.strategy';
import { AuthJwtGuard } from './auth-jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassUser ]),  // Repo si necesitas directo
    PassportModule,
    JwtModule.registerAsync({
      global: true,  // Global para toda la app
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'Lu4nferg0V1rafpUptos',  // Tu secret
        signOptions: { expiresIn: '23h', algorithm: 'HS256' },  // Tu config
      }),
    }),
  ],
  providers: [
    AuthService,  // ← Inyecta tu AuthService para authUser  en JwtService
    JwtService,  // Custom para validaciones extras
    JwtStrategy,
    AuthJwtGuard,
  ],
  exports: [AuthJwtGuard, JwtStrategy, JwtService, AuthService],  // Para reutilizar
})
export class AuthJwtModule {}