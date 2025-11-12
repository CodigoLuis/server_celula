import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class TransformAndValidatePipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        // Verifica si metatype es una clase (no undefined o primitivo)
        if (!metadata.metatype) {
            return value;  // No transforma ni valida si no es una clase
        }

        // Transformando el objeto plano a una instancia de clase
        const obj = plainToInstance(metadata.metatype, value);

        // Integrando el nuevo dato 
        obj.active = true;  // activate the user

        // Validando el objeto transformado
        const errors = await validate(obj);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        return obj;
    }
}