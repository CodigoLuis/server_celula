import { 
  IsOptional, 
  IsBoolean, 
  IsNumber, 
  IsInt, 
  IsString, 
  MaxLength, 
  IsNotEmpty, 
  Min 
} from 'class-validator';

export class ValidatorMeetingDetailDto {

  @IsOptional()
  @IsBoolean({ message: 'El campo dinámica debe ser un valor booleano' })
  dynamic?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El campo alabanza debe ser un valor booleano' })
  praise?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El campo mensaje debe ser un valor booleano' })
  message?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'La ofrenda debe ser un valor numérico' })
  @Min(0, { message: 'La ofrenda no puede ser un valor negativo' })
  offering?: number;

  @IsOptional()
  @IsBoolean({ message: 'El campo consolidación debe ser un valor booleano' })
  consolidation?: boolean;

  @IsOptional()
  @IsString({ message: 'El número de invitados debe ser una cadena de texto' })
  @MaxLength(3, { message: 'El campo invitados no puede exceder los 3 caracteres' })
  // Ej: "10", "5", "100"
  guests?: string;

  @IsNotEmpty({ message: 'El ID de la reunión es obligatorio' })
  @IsInt({ message: 'El ID de la reunión debe ser un número entero' })
  // Representa meeting_id
  meeting: number;
}