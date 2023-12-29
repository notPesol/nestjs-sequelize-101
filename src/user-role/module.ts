import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module';
import { UserRoleRepository } from './repository';
import { UserModule } from 'src/user/module';
import { RoleModule } from 'src/role/module';
import { UserRoleService } from './service';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule), RoleModule],
  providers: [UserRoleRepository, UserRoleService],
  exports: [UserRoleRepository, UserRoleService],
})
export class UserRoleModule {}
