import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUserType } from '../models/user_types.entity';
import { ClassTerritory } from '../models/territories.entity';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUserType , ClassTerritory])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
