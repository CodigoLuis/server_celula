import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassUserType } from 'src/models/user_types.entity';
import { ClassTerritory } from 'src/models/territories.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(ClassUserType)
    private readonly userTypeRepository: Repository<ClassUserType>,
    @InjectRepository(ClassTerritory)
    private readonly territoryRepository: Repository<ClassTerritory>,
  ) {}

  async optionsUserType(): Promise<ClassUserType[]> {
    return await this.userTypeRepository.find(); 
  }

  async optionsTerritory(): Promise<ClassTerritory[]> {
    return await this.territoryRepository.find(); 
  }

}
