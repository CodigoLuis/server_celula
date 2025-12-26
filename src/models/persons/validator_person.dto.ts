import { IsString, IsNotEmpty, IsOptional, IsDateString, Length, MaxLength } from 'class-validator';

export class ValidatorPersonDto {
  
  @IsOptional()
  @IsString({ message: 'La foto debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La URL de la foto no puede exceder los 150 caracteres' })
  photo?: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(1, 30, { message: 'El nombre debe tener entre 1 y 30 caracteres' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Length(1, 40, { message: 'El apellido debe tener entre 1 y 40 caracteres' })
  lastName: string;

  @IsString({ message: 'El género debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  @Length(1, 10, { message: 'El género debe tener máximo 10 caracteres' })
  gender: string; 

  @IsOptional()
  @IsString({ message: 'El estado civil debe ser una cadena de texto' })
  @Length(1, 12, { message: 'El estado civil debe tener máximo 12 caracteres' })
  maritalStatus?: string;

  @IsString({ message: 'El número de identificación debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de identificación es obligatorio' })
  @Length(5, 12, { message: 'El ID debe tener entre 5 y 12 caracteres' })
  idNumber: string;

  @IsOptional()
  @IsString({ message: 'El nivel educativo debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El nivel educativo no puede exceder los 50 caracteres' })
  educationLevel?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @MaxLength(150, { message: 'La dirección no puede exceder los 150 caracteres' })
  address?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato de fecha válido (ISO 8601)' })
  birthDate?: string;
}