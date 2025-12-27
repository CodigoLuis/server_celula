import { IsNotEmpty, IsString, MaxLength, IsEmail, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class ValidatorUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MaxLength(25, { message: 'El nombre de usuario no puede exceder los 25 caracteres' })
  username: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(25, { message: 'La contraseña no puede exceder los 25 caracteres' })
  password: string;

  @IsOptional() 
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @MaxLength(100, { message: 'El correo electrónico no puede exceder los 100 caracteres' })
  email?: string;

  @IsOptional() 
  // @IsNotEmpty({ message: 'El estado de actividad (active) es obligatorio' })
  @IsBoolean({ message: 'El campo active debe ser un valor booleano (true/false)' })
  active: boolean;

  @IsOptional()
  @IsInt({ message: 'El ID del líder debe ser un número entero' })
  leader?: number;

  @IsNotEmpty({ message: 'El ID de la persona es obligatorio' })
  @IsInt({ message: 'El ID de la persona debe ser un número entero' })
  person: number;

  @IsNotEmpty({ message: 'El ID del tipo de usuario es obligatorio' })
  @IsInt({ message: 'El ID del tipo de usuario debe ser un número entero' })
  userType: number;

  @IsNotEmpty({ message: 'El ID del territorio es obligatorio' })
  @IsInt({ message: 'El ID del territorio debe ser un número entero' })
  territory: number;
}