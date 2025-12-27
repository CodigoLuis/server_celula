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
  ValidationPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { ValidatorUserDto } from '../models/users/validator_user.dto';
import { AuthJwtGuard } from '../authJWT/auth_jwt.guard';
import { ClassUser } from '../models/users/users.entity';

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
    @Body(new ValidationPipe({ whitelist: true })) validatorUserDto: ValidatorUserDto, 
    @Req() req
  ) {
    const authUser: ClassUser = req.user;
    return this.userService.registerUser(validatorUserDto, authUser);
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true })) validatorUserDto: ValidatorUserDto
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
}