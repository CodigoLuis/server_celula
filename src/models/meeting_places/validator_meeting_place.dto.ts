import { IsNotEmpty, IsString, MaxLength, IsOptional, IsInt, MinLength } from 'class-validator';

export class ValidatorMeetingPlaceDto {

  @IsNotEmpty({ message: 'El título del lugar de reunión es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(30, { message: 'El título no puede exceder los 30 caracteres' })
  // Ej: "Casa Familia Pérez", "Salón Comunal"
  title: string;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @MaxLength(60, { message: 'La ubicación no puede exceder los 60 caracteres' })
  // Ej: "Calle Falsa 123", "Coordenadas GPS"
  location?: string;

  @IsNotEmpty({ message: 'Los detalles del lugar son obligatorios' })
  @IsString({ message: 'Los detalles deben ser una cadena de texto' })
  @MaxLength(150, { message: 'Los detalles no pueden exceder los 150 caracteres' })
  // Ej: "Frente al parque, portón blanco"
  details: string;

  @IsNotEmpty({ message: 'El ID del usuario responsable es obligatorio' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  // Este campo representa el user_id en la base de datos
  user: number;
}