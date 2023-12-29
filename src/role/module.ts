import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module';
import { RoleRepository } from './repository';
import { RoleController } from './controller';
import { RoleService } from './service';

@Module({
  imports: [DatabaseModule],
  providers: [RoleRepository, RoleService],
  controllers: [RoleController],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
