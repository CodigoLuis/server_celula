import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
  ValidationPipe,
  BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';
import { ValidatorUserDto } from '../models/users/validator_user.dto';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';
import { ClassUser } from '../models/users/users.entity';

import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
@UseGuards(AuthJwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('existing-name')
  async existing(@Query('nameUser') nameUser: string) {
    const result = await this.userService.existingUserName(nameUser);
    return { data: result, existing: !!result };
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true, groups: ['create'] })) validatorUserDto: ValidatorUserDto,
    @Req() req
  ) {
    const authUser: ClassUser = req.user;
    return this.userService.registerUser(validatorUserDto, authUser);
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, groups: ['update'] })) validatorUserDto: ValidatorUserDto
  ) {
    return this.userService.updateUser(id, validatorUserDto);
  }

  @Post('get-list')
  async getList(@Req() req) {
    const user: ClassUser = req.user;
    return this.userService.getListOfUser(user);
  }

  @Get('profile')
  async getProfile(@Req() req) {
    return this.userService.profileDetails(req.user);
  }


  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/profileFiles', // Asegúrate de que esta carpeta exista
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      // 1. Validamos extensión y 2. Validamos el tipo MIME
      if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/) || !file.mimetype.startsWith('image/')) {
        return callback(new BadRequestException('Solo se permiten imágenes (JPG, PNG, WEBP)'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 2.5 * 1024 * 1024, // Límite exacto de 2.5MB
    }
  }))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('El archivo no cumple con los requisitos o no fue enviado');
    }
    const userId = req.user.id;
    return this.userService.updateAvatar(userId, `profileFiles/${file.filename}`);
  }


}