import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRoleModule } from 'src/user-role/module';
import { UserBLL } from './user.bll';

@Module({
  imports: [DatabaseModule, UserRoleModule],
  providers: [UserRepository, UserService, UserBLL],
  controllers: [UserController],
  exports: [UserService, UserRepository, UserBLL],
})
export class UserModule {}
