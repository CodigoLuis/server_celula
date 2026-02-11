import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CellService } from './cell.service';
import { ValidatorCellDto } from '../models/cells/validator_cell.dto';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';

@Controller('cell')
@UseGuards(AuthJwtGuard)
export class CellController {
  constructor(private readonly cellService: CellService) { }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: ValidatorCellDto
  ) {
    // Nota: El DTO ya incluye el ID del usuario/líder, 
    // pero si quisieras usar el usuario autenticado como creador, podrías usar @Req()
    return this.cellService.registerCell(dto);
  }

  // @Put('update/:id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) 
  //   dto: ValidatorCellDto
  // ) {
  //   return this.cellService.updateCell(id, dto);
  // }

  @Get('list')
  async getList() {
    return this.cellService.getCells();
  }

  // @Delete('delete/:id')
  // async delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.cellService.deleteCell(id);
  // }

}