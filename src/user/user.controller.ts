import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSearchDTO } from './dto/search-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { UniqueConstraintFilter } from 'src/common/filter/unique-constant.filter';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerResponse,
  SwaggerSearchResponse,
} from 'src/common/swagger/swagger-response';
import { UserDTO } from './dto/user.dto';

@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('/:id')
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
  async update(@Body() dto: UserDTO) {
    return this.userService.update(dto);
  }

  @Post()
  @SwaggerResponse(UserDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter(), new UniqueConstraintFilter())
  async create(@Body() dto: CreateUserDTO) {
    return this.userService.create(dto);
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
