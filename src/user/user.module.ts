import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}
