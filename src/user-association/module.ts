import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserAssociationRepository } from './repository';
import { RoleModule } from 'src/role/role.module';
import { UserRoleModule } from 'src/user-role/module';
import { UserAssociationService } from './service';

@Module({
  imports: [UserModule, RoleModule, UserRoleModule],
  providers: [UserAssociationRepository, UserAssociationService],
  exports: [UserAssociationService],
})
export class UserAssociationModule {}
