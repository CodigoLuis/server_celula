import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ValidatorMemberTypeDto {

  @IsNotEmpty({ message: 'El título del tipo de miembro es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'El título no puede exceder los 20 caracteres' })
  // Ej: "Anfitrión", "Líder", "Discípulo"
  title: string;

  @IsNotEmpty({ message: 'La descripción del tipo de miembro es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La descripción no puede exceder los 150 caracteres' })
  // Ej: "Persona que presta su hogar para la reunión semanal"
  description: string;

}