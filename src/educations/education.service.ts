import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEducation } from '../models/educations/educations.entity'; // Ajusta la ruta
import { ValidatorEducationDto } from '../models/educations/validator_education.dto'; // Ajusta la ruta

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(ClassEducation)
    private readonly educationRepository: Repository<ClassEducation>,
  ) { }

  // Mostrar todos los registros
  // async findAll(): Promise<ClassEducation[]> {
  //   return await this.educationRepository.find({
  //     relations: ['person'], 
  //   });
  // }

  // Mostrar un registro por ID de persona
  async findByPersonId(personId: number): Promise<ClassEducation> {
    const record = await this.educationRepository.findOne({
      where: { personId },
      relations: ['person'],
    });

    if (!record) {
      throw new NotFoundException(`No se encontró registro educativo para la persona`);
    }
    return record;
  }

  // Registrar (Crear)
  async create(createEducationDto: ValidatorEducationDto): Promise<ClassEducation> {
    
    const { person, ...rest } = createEducationDto; // Extraemos 'person' para que no choque

    const existing = await this.educationRepository.findOne({
      where: { personId: person },
    });

    if (existing) {
      throw new BadRequestException('Esta persona ya tiene un registro educativo.');
    }

    // Creamos el objeto asegurando que personId reciba el número
    const newEducation = this.educationRepository.create({
      ...rest,
      personId: person,
    });

    return await this.educationRepository.save(newEducation);

  }

  // Actualizar
  async update(updateEducationDto: ValidatorEducationDto): Promise<ClassEducation> {

    const education = await this.educationRepository.findOne({
      where: { personId: updateEducationDto.person }, 
    });

    if (!education) {
      throw new NotFoundException(`No existe registro para la persona`);
    }

    const { person, ...rest } = updateEducationDto;

    const updatedEducation = this.educationRepository.merge(education, {
      ...rest,
      personId: person || education.personId,
    });

    return await this.educationRepository.save(updatedEducation);

  }


}
