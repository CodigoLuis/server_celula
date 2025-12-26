import { IsNotEmpty, IsBoolean, IsInt } from 'class-validator';

export class ValidatorCellsPersonsDto {

  @IsNotEmpty({ message: 'El estado de la vinculación (active) es obligatorio' })
  @IsBoolean({ message: 'El campo active debe ser un valor booleano (true/false)' })
  active: boolean;

  @IsNotEmpty({ message: 'El ID del tipo de miembro es obligatorio' })
  @IsInt({ message: 'El ID del tipo de miembro debe ser un número entero' })
  // Representa member_type_id (ej: Líder, Asistente)
  memberType: number;

  @IsNotEmpty({ message: 'El ID de la célula es obligatorio' })
  @IsInt({ message: 'El ID de la célula debe ser un número entero' })
  // Representa cell_id
  cell: number;

  @IsNotEmpty({ message: 'El ID de la persona es obligatorio' })
  @IsInt({ message: 'El ID de la persona debe ser un número entero' })
  // Representa person_id
  person: number;
}