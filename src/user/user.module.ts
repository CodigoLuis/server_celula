import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassUser } from '../models/users/users.entity';
import { ClassPerson } from '../models/persons/persons.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassUser , ClassPerson])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
