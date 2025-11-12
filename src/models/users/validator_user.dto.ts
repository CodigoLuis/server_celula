import { IsNotEmpty, IsString, MaxLength, IsEmail, IsBoolean, IsOptional, IsInt, IsIn } from 'class-validator';

export class ValidatorUserDto {
  @IsNotEmpty({ message: 'El username es obligatorio' })
  @IsString({ message: 'El username debe ser una cadena' })
  @MaxLength(25, { message: 'El username no puede exceder 25 caracteres' })
  username: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena' })
  @MaxLength(25, { message: 'La contraseña no puede exceder 25 caracteres' })
  // Nota: En producción, valida fortaleza (e.g., con regex) y hashea la contraseña antes de guardar
  password: string;

  @IsOptional() 
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
  email?: string;

  @IsNotEmpty({ message: 'El campo active es obligatorio' })
  @IsBoolean({ message: 'Active debe ser un booleano' })
  active: boolean;

  // created_at y updated_at se manejan automáticamente en la entidad (no en DTO)

  @IsOptional()
  @IsInt({ message: 'leader_id debe ser un entero' })
  leader?: number;

  @IsNotEmpty({ message: 'person_id es obligatorio' })
  @IsInt({ message: 'person_id debe ser un entero' })
  person: number;

  @IsNotEmpty({ message: 'user_type_id es obligatorio' })
  @IsString({ message: 'user_type_id debe ser una cadena' })
  @MaxLength(2, { message: 'user_type_id no puede exceder 2 caracteres' })
  userType: string;

  @IsNotEmpty({ message: 'territory_id es obligatorio' })
  @IsString({ message: 'territory_id debe ser una cadena' })
  @MaxLength(2, { message: 'territory_id no puede exceder 2 caracteres' })
  territory: string;
}