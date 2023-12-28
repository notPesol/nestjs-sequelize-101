import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserRoleRepository } from './repository';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [DatabaseModule, UserModule, RoleModule],
  providers: [UserRoleRepository],
  exports: [UserRoleRepository],
})
export class UserRoleModule {}
