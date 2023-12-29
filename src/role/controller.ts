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
import { RoleService } from './service';
import { RoleSearchDTO } from './dto/search-role.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { UniqueConstraintFilter } from 'src/common/filter/unique-constant.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  SwaggerResponse,
  SwaggerSearchResponse,
} from 'src/common/swagger/swagger-response';
import { RoleDTO } from './dto/role.dto';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Delete('/:id')
  @SwaggerResponse(RoleDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }

  @Put()
  @SwaggerResponse(RoleDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter(), new UniqueConstraintFilter())
  async update(@Body() dto: RoleDTO) {
    return this.roleService.update(dto);
  }

  @Post()
  @SwaggerResponse(RoleDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter(), new UniqueConstraintFilter())
  async create(@Body() dto: CreateRoleDTO) {
    return this.roleService.create(dto);
  }

  @Get()
  @SwaggerSearchResponse(RoleDTO)
  @UsePipes(new ValidationPipe({ transform: true }))
  async search(@Query() searchDTO: RoleSearchDTO) {
    return this.roleService.search(searchDTO);
  }

  @Get('/:id')
  @SwaggerResponse(RoleDTO)
  async getById(@Param('id') id: string) {
    return this.roleService.getById(id);
  }
}
