import { IsOptional, IsString, MaxLength, IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class ValidatorEducationDto {

  @IsOptional()
  @IsString({ message: 'El nivel de consolidación debe ser una cadena de texto' })
  @MaxLength(2, { message: 'El nivel de consolidación no puede exceder los 2 caracteres' })
  consolidationLevel?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo Escuela de Líderes debe ser un valor booleano (true/false)' })
  leaderSchool?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El campo Escuela Profética debe ser un valor booleano (true/false)' })
  propheticSchool?: boolean;

  @IsNotEmpty({ message: 'El ID de la persona es obligatorio' })
  @IsInt({ message: 'El ID de la persona debe ser un número entero' })
  person: number;
}