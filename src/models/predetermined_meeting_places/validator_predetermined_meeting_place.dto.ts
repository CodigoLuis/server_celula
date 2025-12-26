import { IsNotEmpty, IsBoolean, IsInt } from 'class-validator';

export class ValidatorPredeterminedMeetingPlaceDto {

  @IsNotEmpty({ message: 'El estado activo es obligatorio' })
  @IsBoolean({ message: 'El campo active debe ser un valor booleano (true/false)' })
  active: boolean;

  @IsNotEmpty({ message: 'El ID de la célula es obligatorio' })
  @IsInt({ message: 'El ID de la célula debe ser un número entero' })
  // Representa la columna cell_id
  cell: number;

  @IsNotEmpty({ message: 'El ID del lugar de reunión es obligatorio' })
  @IsInt({ message: 'El ID del lugar de reunión debe ser un número entero' })
  // Representa la columna meeting_place_id
  meetingPlace: number;
}