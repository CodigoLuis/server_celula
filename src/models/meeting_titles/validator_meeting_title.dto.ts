import { IsNotEmpty, IsString, MaxLength, MinLength, IsInt } from 'class-validator';

export class ValidatorTitleDto {

  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(30, { message: 'El título no puede exceder los 30 caracteres' })
  // Ej: "Reunión de Planificación", "Clase de Discipulado"
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La descripción no puede exceder los 150 caracteres' })
  // Ej: "Sesión semanal para coordinar las actividades de la célula"
  description: string;

  @IsNotEmpty({ message: 'El ID del usuario responsable es obligatorio' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  // Representa el user_id en la base de datos
  user: number;
}