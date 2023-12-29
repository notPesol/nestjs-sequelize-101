import { Module } from '@nestjs/common';
import { FileService } from './service';

@Module({
  imports: [],
  providers: [FileService],
  controllers: [],
  exports: [FileService],
})
export class FileModule {}
