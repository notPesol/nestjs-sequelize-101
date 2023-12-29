import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module';
import { UserRepository } from './repository';
import { UserController } from './controller';
import { UserService } from './service';
import { UserRoleModule } from 'src/user-role/module';
import { UserBLL } from './bll';

@Module({
  imports: [DatabaseModule, UserRoleModule],
  providers: [UserRepository, UserService, UserBLL],
  controllers: [UserController],
  exports: [UserService, UserRepository, UserBLL],
})
export class UserModule {}
