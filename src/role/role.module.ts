import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleRepository } from './role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  providers: [RoleRepository, RoleService],
  controllers: [RoleController],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
