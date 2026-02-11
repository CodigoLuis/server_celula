import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { OptionsService } from './options.service';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';

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

    @Get('cell-type')
    @UseGuards(AuthJwtGuard)
    async getCellType() {
        const cellType = await this.optionsService.optionsCellType();
        return { data: cellType, count: cellType.length };
    }

    @Get('meeting-place')
    @UseGuards(AuthJwtGuard)
    async getMeetingPlace() {
        const meetingPlace = await this.optionsService.optionsMeetingPlace();
        return { data: meetingPlace, count: meetingPlace.length };
    }

    @Get('user')
    @UseGuards(AuthJwtGuard)
    async optionsUser(@Query('territoryId') territoryId: number) {
        const user = await this.optionsService.optionsUser(territoryId);
        return { data: user, count: user.length };
    }

    @Get('memberType')
    @UseGuards(AuthJwtGuard)
    async getMemberType() {
        const memberType = await this.optionsService.optionsMemberType();
        return { data: memberType, count: memberType.length };
    } 

    @Get('cell')
    @UseGuards(AuthJwtGuard)
    async optionsCell(@Query('territoryId') territoryId: number) {
        const user = await this.optionsService.optionsCells(territoryId);
        return { data: user, count: user.length };
    }

}