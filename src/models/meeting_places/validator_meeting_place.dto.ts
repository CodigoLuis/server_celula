import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsInt,
  MinLength,
  IsNumber,
  IsDecimal
} from 'class-validator';

export class ValidatorMeetingPlaceDto {

  @IsNotEmpty({ groups: ['create'], message: 'El título del lugar de reunión es obligatorio' })
  @IsOptional({ groups: ['update'] })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' }) // Sincronizado con varchar(100)
  title: string;

  @IsNotEmpty({ groups: ['create'], message: 'La dirección es obligatoria' })
  @IsOptional({ groups: ['update'] })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La dirección no puede exceder los 255 caracteres' }) // Sincronizado con varchar(255)
  address: string;

  @IsOptional({ always: true })
  @IsString({ message: 'Los detalles deben ser una cadena de texto' })
  // Quitamos el MaxLength de 150 porque en la entidad es 'text' (ilimitado), 
  // pero podemos dejar uno razonable como 1000 si deseas.
  details?: string;

  @IsOptional({ always: true })
  @IsNumber({}, { message: 'La latitud debe ser un número decimal' })
  latitude?: number;

  @IsOptional({ always: true })
  @IsNumber({}, { message: 'La longitud debe ser un número decimal' })
  longitude?: number;

  @IsOptional({ always: true })
  // @IsNotEmpty({ message: 'El ID del usuario responsable es obligatorio' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  // En el DTO recibimos el ID (number), luego en el service lo vinculas a la entidad ClassUser
  user: number;

}