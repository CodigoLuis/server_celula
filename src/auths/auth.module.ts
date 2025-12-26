import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ClassUser  } from '../models/users/users.entity';  // Tu entity
import { AuthJwtModule } from '../authJWT/auth_jwt.module';  // ← NUEVO: Importa JWT module

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,  // Para strategies (usado en authJWT)
    TypeOrmModule.forFeature([ClassUser ]),  // Tu repo
    AuthJwtModule,  // ← NUEVO: Importa JWT: trae JwtService, strategy, guard (global)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, AuthJwtModule],  // Exporta para otros módulos
})
export class AuthModule {}

// imports: [
//   PassportModule,
//   JwtModule.register({
//     secret: process.env.JWT_SECRET || 'Lu4nferg0V1rafpUptos',
//     signOptions: { expiresIn: '1h', algorithm: 'HS256' },
//   }),
//   TypeOrmModule.forFeature([ClassUser])
// ],