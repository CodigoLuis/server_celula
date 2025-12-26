import { IsNotEmpty, IsInt } from 'class-validator';

export class ValidatorSpecialActivityDto {

  @IsNotEmpty({ message: 'El ID de la reunión es obligatorio' })
  @IsInt({ message: 'El ID de la reunión debe ser un número entero' })
  // Representa meeting_id
  meetingId: number;

  @IsNotEmpty({ message: 'El ID del lugar de reunión es obligatorio' })
  @IsInt({ message: 'El ID del lugar de reunión debe ser un número entero' })
  // Representa meeting_place_id
  meetingPlaceId: number;

}