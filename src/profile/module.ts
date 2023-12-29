import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module';
import { ProfileRepository } from './repository';
import { UserModule } from 'src/user/module';
import { ProfileService } from './service';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileRepository, ProfileService],
})
export class ProfileModule {}
