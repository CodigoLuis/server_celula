import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassUserType } from 'src/models/user_types/user_types.entity';
import { ClassTerritory } from 'src/models/territories/territories.entity';
// import { ClassCellType } from 'src/models/cell_types.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(ClassUserType)
    private readonly userTypeRepository: Repository<ClassUserType>,
    @InjectRepository(ClassTerritory)
    private readonly territoryRepository: Repository<ClassTerritory>,
    //     @InjectRepository(ClassCellType)
    // private readonly cellTypeRepository: Repository<ClassCellType>,

  ) {}

  async optionsUserType(): Promise<ClassUserType[]> {
    return await this.userTypeRepository.find(); 
  }

  async optionsTerritory(): Promise<ClassTerritory[]> {
    return await this.territoryRepository.find(); 
  }

  // async optionsCellType(): Promise<ClassCellType[]> {
  //   return await this.cellTypeRepository.find(); 
  // }

}
