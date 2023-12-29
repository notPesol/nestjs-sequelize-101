import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/module';
import { ProfileRepository } from './repository';
import { UserModule } from 'src/user/module';
import { ProfileService } from './service';
import { ProfileController } from './controller';
import { FileModule } from 'src/file/module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule), FileModule],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileRepository, ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
