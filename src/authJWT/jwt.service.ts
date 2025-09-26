import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';  // Tu service
import { ClassUser  } from '../models/users.entity';  // Tu entity

@Injectable()
export class JwtService {  // Custom: Validaciones extras JWT
  constructor(private authService: AuthService) {}  // Usa tu AuthService

  /**
   * Valida payload: Llama tu authUser  (DB query con joins) y chequea.
   * Retorna user enriquecido para req.user.
   */
  async validatePayload(payload: { id: number; username: string; type?: string }): Promise<ClassUser > {
    // Usa tu método authUser  para validación DB (incluye chequeos active/username)
    const user: ClassUser  = await this.authService.authUser(payload.username, payload.id);

    // Validaciones extras (ejemplos escalables):
    // if (payload.type && payload.type !== user.userType.title) { throw new UnauthorizedException('Tipo inválido'); }
    // if (await this.isTokenRevoked(payload.id)) { throw new UnauthorizedException('Token revocado'); }

    return user;  // Retorna con person y userType (para controller)
  }

  /**
   * Opcional: Chequeo de revocación (implementa si agregas tabla revoked_tokens).
   */
  async isTokenRevoked(userId: number): Promise<boolean> {
    // Placeholder: Query a DB si implementas
    return false;
  }

  /**
   * Opcional: Enriquecer payload en login (llama en generateToken si necesitas).
   */
  async enrichPayload(payload: any, user: ClassUser ): Promise<any> {
    return {
      ...payload,
      email: user.email,  // Ejemplo: Agrega de tu entity
      // role: user.userType.title,
    };
  }
}