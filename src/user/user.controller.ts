import { Controller, Post, Body, Get, Query, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidatorUserDto } from '../models/users/validator_user.dto';
import { ClassUser } from '../models/users/users.entity';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';
import { TransformAndValidatePipe } from './transform_and_validate.pipe';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get('existing-name')
  @UseGuards(AuthJwtGuard)
  async existing(@Query('nameUser') nameUser: string) {
    const result = await this.userService.existingUserName(nameUser);
    return { data: result, existing: result ? true : false };
  }

  @Post('register')
  @UseGuards(AuthJwtGuard)
  async register(@Body(TransformAndValidatePipe) validatorUserDto: ValidatorUserDto, @Req() req) {
    const user: ClassUser = req.user;

    return this.userService.registerUser(validatorUserDto, user);
  }

  @Post('get-list')
  @UseGuards(AuthJwtGuard)
  async getList(@Req() req) {
    const user: ClassUser = req.user;

    return this.userService.getListOfUser(user);
  }

}
