import { IsNotEmpty, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class ValidatorAttendanceDto {

  @IsNotEmpty({ message: 'El ID de la persona es obligatorio' })
  @IsInt({ message: 'El ID de la persona debe ser un número entero' })
  // Mapea a person_id
  personId: number;

  @IsNotEmpty({ message: 'El ID de la reunión es obligatorio' })
  @IsInt({ message: 'El ID de la reunión debe ser un número entero' })
  // Mapea a meeting_id
  meetingId: number;

  @IsNotEmpty({ message: 'El ID del tipo de asistencia es obligatorio' })
  @IsInt({ message: 'El ID del tipo de asistencia debe ser un número entero' })
  // Representa la relación con ClassAttendanceType
  attendanceType: number;

  @IsOptional()
  @IsBoolean({ message: 'El campo asistió (attended) debe ser un valor booleano' })
  attended?: boolean;
}