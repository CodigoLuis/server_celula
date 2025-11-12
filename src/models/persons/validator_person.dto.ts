import { IsString, IsNotEmpty, IsOptional, IsDateString, Length } from 'class-validator';

export class ValidatorPersonDto {
  
  // Campos opcionales
  @IsOptional()
  @IsString()
  @Length(0, 150)
  photo?: string;


  // Campos obligatorios
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 40)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  gender: string;  // Ej: 'M', 'F'


  // Campos opcionales
  @IsOptional()
  @IsString()
  @Length(0, 12)
  maritalStatus?: string;  // Ej: 'Soltero', 'Casado'


  // Campos obligatorios
  @IsString()
  @IsNotEmpty()
  @Length(0, 12)
  idNumber: string;  // Número de identificación


  // Campos opcionales
  @IsOptional()
  @IsString()
  @Length(0, 50)
  educationLevel?: string;  // Ej: 'Universitario', 'Secundario'

  @IsOptional()
  @IsString()
  @Length(0, 15)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(0, 150)
  address?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;  // Formato: 'YYYY-MM-DD'
}
