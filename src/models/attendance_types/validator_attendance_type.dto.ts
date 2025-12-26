import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ValidatorAttendanceTypeDto {

  @IsNotEmpty({ message: 'El título del tipo de asistencia es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'El título no puede exceder los 20 caracteres' })
  // Ej: "Presencial", "Virtual", "Falta Justificada"
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La descripción no puede exceder los 100 caracteres' })
  // Ej: "El miembro asistió físicamente al lugar de reunión"
  description: string;

}