import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ValidatorUserTypeDto {

  @IsNotEmpty({ message: 'El título del tipo de usuario es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'El título no puede exceder los 20 caracteres' })
  // Ejemplos: 'Admin', 'Líder', 'Pastor'
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La descripción no puede exceder los 150 caracteres' })
  // Ejemplo: 'Usuario con permisos de lectura y escritura en todas las células'
  description: string;

}