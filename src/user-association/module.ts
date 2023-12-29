import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/module';
import { UserAssociationRepository } from './repository';
import { RoleModule } from 'src/role/module';
import { UserRoleModule } from 'src/user-role/module';
import { UserAssociationService } from './service';
import { ProfileModule } from 'src/profile/module';
import { UserAssociationController } from './controller';

@Module({
  imports: [UserModule, RoleModule, UserRoleModule, ProfileModule],
  providers: [UserAssociationRepository, UserAssociationService],
  exports: [UserAssociationService],
  controllers: [UserAssociationController],
})
export class UserAssociationModule {}
