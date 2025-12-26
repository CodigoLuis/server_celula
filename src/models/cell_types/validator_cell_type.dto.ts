import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ValidatorCellTypeDto {

  @IsNotEmpty({ message: 'El título del tipo de célula es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'El título no puede exceder los 20 caracteres' })
  // Ej: "Familiar", "Juvenil", "Infantil"
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La descripción no puede exceder los 150 caracteres' })
  // Ej: "Grupo enfocado en la integración de familias y principios básicos"
  description: string;

}