import { 
  IsNotEmpty, 
  IsString, 
  MaxLength, 
  IsBoolean, 
  IsOptional, 
  IsInt, 
  IsDateString 
} from 'class-validator';

export class ValidatorCellDto {

  @IsNotEmpty({ message: 'El título de la célula es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El título no puede exceder los 20 caracteres' })
  title: string;

  @IsNotEmpty({ message: 'El estado activo es obligatorio' })
  @IsBoolean({ message: 'El campo active debe ser un valor booleano' })
  active: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato de fecha válido (ISO 8601)' })
  startDate?: string;

  @IsNotEmpty({ message: 'El ID del territorio es obligatorio' })
  @IsInt({ message: 'El ID del territorio debe ser un número entero' })
  territory: number;

  @IsNotEmpty({ message: 'El ID del tipo de célula es obligatorio' })
  @IsInt({ message: 'El ID del tipo de célula debe ser un número entero' })
  cellType: number;

  @IsNotEmpty({ message: 'El ID del lugar de reunión es obligatorio' })
  @IsInt({ message: 'El ID del lugar de reunión debe ser un número entero' })
  meetingPlace: number;

  @IsNotEmpty({ message: 'El ID del usuario responsable es obligatorio' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  user: number;
}