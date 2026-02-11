import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ClassCell } from '../models/cells/cells.entity';
import { ClassPredeterminedMeetingPlace } from '../models/predetermined_meeting_places/predetermined_meeting_places.entity';
import { ValidatorCellDto } from '../models/cells/validator_cell.dto';

@Injectable()
export class CellService {
  constructor(
    @InjectRepository(ClassCell)
    private readonly cellRepository: Repository<ClassCell>,

    @InjectRepository(ClassPredeterminedMeetingPlace)
    private readonly preMeetingRepository: Repository<ClassPredeterminedMeetingPlace>,
  ) { }

  async registerCell(dto: ValidatorCellDto): Promise<ClassCell> {
    const cellData: DeepPartial<ClassCell> = {
      title: dto.title,
      active: true,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      territory: { id: dto.territory },
      cellType: { id: dto.cellType },
      user: { id: dto.user },
    };

    const newCell = this.cellRepository.create(cellData);
    const savedCell = await this.cellRepository.save(newCell);

    const preMeetingData: DeepPartial<ClassPredeterminedMeetingPlace> = {
      active: true,
      cell: { id: savedCell.id },
      meetingPlace: { id: dto.meetingPlace },
    };

    await this.preMeetingRepository.save(this.preMeetingRepository.create(preMeetingData));
    return savedCell;
  }

  // async updateCell(id: number, dto: ValidatorCellDto): Promise<ClassCell> {
  //   // 1. Verificar si la célula existe
  //   const cell = await this.cellRepository.findOne({ where: { id } });
  //   if (!cell) throw new NotFoundException(`Célula con ID ${id} no encontrada.`);

  //   // 2. Actualizar datos básicos de la célula
  //   const updateData: DeepPartial<ClassCell> = {
  //     title: dto.title,
  //     active: dto.active,
  //     startDate: dto.startDate ? new Date(dto.startDate) : cell.startDate,
  //     territory: { id: dto.territory },
  //     cellType: { id: dto.cellType },
  //     user: { id: dto.user },
  //     updatedAt: new Date(),
  //   };

  //   this.cellRepository.merge(cell, updateData);
  //   const updatedCell = await this.cellRepository.save(cell);

  //   // 3. Actualizar el lugar de reunión predeterminado
  //   // Buscamos el registro actual en la tabla relacional
  //   const preMeeting = await this.preMeetingRepository.findOne({ 
  //     where: { cell: { id: updatedCell.id } } 
  //   });

  //   if (preMeeting) {
  //     preMeeting.meetingPlace = { id: dto.meetingPlace } as any;
  //     preMeeting.updatedAt = new Date();
  //     await this.preMeetingRepository.save(preMeeting);
  //   }

  //   return updatedCell;
  // }

  // async deleteCell(id: number): Promise<{ message: string }> {
  //   // Nota: Debido a las FK, primero debemos borrar (o desactivar) el lugar predeterminado
  //   // Si tu base de datos tiene ON DELETE CASCADE, esto es más simple.

  //   // Borramos la relación predeterminada primero
  //   await this.preMeetingRepository.delete({ cell: { id } });

  //   const result = await this.cellRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`No se pudo eliminar: Célula con ID ${id} no existe.`);
  //   }

  //   return { message: `Célula con ID ${id} eliminada correctamente.` };
  // }

  async getCells(): Promise<ClassCell[]> {
    return await this.cellRepository
      .createQueryBuilder('cell')
      .leftJoinAndSelect('cell.territory', 'territory')
      .leftJoinAndSelect('cell.cell_type', 'type')
      .leftJoinAndSelect('cell.user', 'leader')
      .leftJoinAndSelect('cell.predetermined_meeting_places', 'pre_meeting')
      .leftJoinAndSelect('pre_meeting.meeting_place', 'place')
      .getMany();
  }

}