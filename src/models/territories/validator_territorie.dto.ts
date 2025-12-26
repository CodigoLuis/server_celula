import { IsNotEmpty, IsString, MaxLength, IsBoolean, IsOptional, Matches } from 'class-validator';

export class ValidatorTerritoryDto {

  @IsNotEmpty({ message: 'El nombre del territorio es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(17, { message: 'El nombre del territorio no puede exceder los 17 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El campo male (género del territorio) es obligatorio' })
  @IsBoolean({ message: 'El campo male debe ser un valor booleano (true/false)' })
  male: boolean;

  @IsOptional()
  @IsString({ message: 'El color debe ser una cadena de texto' })
  @MaxLength(7, { message: 'El código de color no puede exceder los 7 caracteres' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'El color debe ser un formato hexadecimal válido (ej: #FF5733)',
  })
  color?: string;
}