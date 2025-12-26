import { 
  IsNotEmpty, 
  IsString, 
  IsOptional, 
  IsBoolean, 
  IsInt, 
  IsDateString, 
  Matches 
} from 'class-validator';

export class ValidatorMeetingDto {

  @IsNotEmpty({ message: 'La fecha de la reunión es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido (YYYY-MM-DD)' })
  date: string;

  @IsNotEmpty({ message: 'La hora de inicio es obligatoria' })
  @IsString({ message: 'La hora de inicio debe ser una cadena de texto' })
  @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, { 
    message: 'La hora de inicio debe tener un formato de 24 horas válido (HH:mm)' 
  })
  startTime: string;

  @IsOptional()
  @IsString({ message: 'La hora de finalización debe ser una cadena de texto' })
  @Matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, { 
    message: 'La hora de finalización debe tener un formato de 24 horas válido (HH:mm)' 
  })
  endTime?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo completado debe ser un valor booleano' })
  completed?: boolean;

  @IsNotEmpty({ message: 'El ID de la célula es obligatorio' })
  @IsInt({ message: 'El ID de la célula debe ser un número entero' })
  cell: number;

  @IsNotEmpty({ message: 'El ID del usuario responsable es obligatorio' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  user: number;

  @IsNotEmpty({ message: 'El ID del título de la reunión es obligatorio' })
  @IsInt({ message: 'El ID del título debe ser un número entero' })
  title: number;
}