import { IsNotEmpty, IsString, MaxLength, IsEmail, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class ValidatorUserDto {
  @IsNotEmpty({ always: true, message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MaxLength(25, { message: 'El nombre de usuario no puede exceder los 25 caracteres' })
  username: string;

  @IsNotEmpty({ groups: ['create'], message: 'La contraseña es obligatoria' })
  @IsOptional({ groups: ['update'] }) // Opcional al editar
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(25, { message: 'La contraseña no puede exceder los 25 caracteres' })
  password: string;

  @IsOptional({ always: true })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @MaxLength(100, { message: 'El correo electrónico no puede exceder los 100 caracteres' })
  email?: string;

  @IsNotEmpty({ groups: ['update'], message: 'El estado de actividad (active) es obligatorio' })
  @IsOptional({ groups: ['create'] }) // Solo obligatorio al editar
  @IsBoolean({ message: 'El campo active debe ser un valor booleano (true/false)' })
  active: boolean;

  @IsOptional({ always: true })
  // @IsNotEmpty({ groups: ['create'] }) // Solo obligatorio al crear
  // @IsOptional({ groups: ['update'] }) // Opcional al editar
  @IsInt({ message: 'El ID del líder debe ser un número entero' })
  leader?: number;

  @IsNotEmpty({ groups: ['create'], message: 'El ID de la persona es obligatorio' })
  @IsOptional({ groups: ['update'] }) // Opcional al editar
  @IsInt({ message: 'El ID de la persona debe ser un número entero' })
  person: number;

  @IsNotEmpty({ always: true, message: 'El ID del tipo de usuario es obligatorio' })
  @IsInt({ message: 'El ID del tipo de usuario debe ser un número entero' })
  userType: number;

  @IsNotEmpty({ always: true, message: 'El ID del territorio es obligatorio' })
  @IsInt({ message: 'El ID del territorio debe ser un número entero' })
  territory: number;
}

// @IsNotEmpty({ groups: ['create'] }) // Solo obligatorio al crear
// @IsOptional({ groups: ['update'] }) // Opcional al editar