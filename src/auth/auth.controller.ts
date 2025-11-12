import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';  // ← NUEVO: Importa de authJWT
import { ClassUser  } from '../models/users/users.entity';  // Para tipos

interface dataAuthToken {
  firstName: string;
  lastName: string;
  type: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      const user = await this.authService.validateUser (body.username, body.password);

      if (user) {
        const data = await this.authService.generateToken(user);
        return { message: 'Inicio de sesión exitoso', data };
      }

      return { message: 'Credenciales inválidas' };
    } catch (error) {
      return { message: error.message };  // Maneja Unauthorized
    }
  }

  @Get('authentication')
  @UseGuards(AuthJwtGuard)  // Protege con JWT de authJWT
  async authenticate(@Req() req): Promise<dataAuthToken> {
    // req.user viene de JwtStrategy (ClassUser  con person y userType)
    const user: ClassUser = req.user;
    return {
      firstName: user.person.firstName,
      lastName: user.person.lastName,
      type: user.userType.title,
    };
  }

  
}