import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './service';
import { UserSearchDTO } from './dto/search-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { UniqueConstraintFilter } from 'src/common/filter/unique-constant.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  SwaggerResponse,
  SwaggerSearchResponse,
} from 'src/common/swagger/swagger-response';
import { UserDTO } from './dto/dto';
import { ROLES } from 'src/role/enum';
import { Roles } from 'src/role/decorator';
import { UserBLL } from './bll';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userBLL: UserBLL,
  ) {}

  @Delete('/:id')
  @Roles(ROLES.ADMIN)
  @SwaggerResponse(UserDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Put()
  @SwaggerResponse(UserDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter(), new UniqueConstraintFilter())
  async update(@Req() req, @Body() dto: CreateUserDTO) {
    return this.userService.update(dto, req);
  }

  @Post()
  @Roles(ROLES.ADMIN)
  @SwaggerResponse(UserDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter(), new UniqueConstraintFilter())
  async create(@Body() dto: CreateUserDTO) {
    return this.userBLL.create(dto);
  }

  @Get()
  @SwaggerSearchResponse(UserDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  async search(@Query() searchDTO: UserSearchDTO) {
    return this.userService.search(searchDTO);
  }

  @Get('/:id')
  @SwaggerResponse(UserDTO)
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
