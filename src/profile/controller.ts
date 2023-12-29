import {
  Body,
  Controller,
  Put,
  UploadedFile,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './service';
import { ProfileDTO } from './dto/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('/profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Put()
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter())
  @UseInterceptors(FileInterceptor('file'))
  update(@UploadedFile() file: Express.Multer.File, @Body() dto: ProfileDTO) {
    return this.service.update(dto, file);
  }
}
