import {
  Controller,
  Get,
  Param,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAssociationService } from './service';
import { VIEWS } from './repository';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { UserAssociationSearchDTO } from './dto/search.dto';
import {
  SwaggerResponse,
  SwaggerSearchResponse,
} from 'src/common/swagger/swagger-response';
import { UserAssociationDTO } from './dto/dto';

@ApiBearerAuth()
@ApiTags('User Association')
@Controller('/user-association')
export class UserAssociationController {
  constructor(private readonly service: UserAssociationService) {}

  @Get('/:view')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'view', enum: VIEWS })
  @SwaggerSearchResponse(UserAssociationDTO)
  @UseFilters(new HttpExceptionFilter())
  search(
    @Param('view') view: VIEWS,
    @Query() searchDTO: UserAssociationSearchDTO,
  ) {
    return this.service.search(view, searchDTO);
  }
}
