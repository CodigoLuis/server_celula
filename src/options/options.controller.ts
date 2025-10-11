import { Controller, Get, UseGuards } from '@nestjs/common';
import { OptionsService } from './options.service';
import { AuthJwtGuard } from '../authJWT/auth-jwt.guard';

@Controller('options')
export class OptionsController {
    constructor(private readonly optionsService: OptionsService) { }

    @Get('user-types')
    @UseGuards(AuthJwtGuard)
    async getUserTypes() {
        const userTypes = await this.optionsService.optionsUserType();
        return { data: userTypes, count: userTypes.length };
    }

    @Get('territories')
    @UseGuards(AuthJwtGuard)
    async getTerritories() {
        const territories = await this.optionsService.optionsTerritory();
        return { data: territories, count: territories.length };
    }

}