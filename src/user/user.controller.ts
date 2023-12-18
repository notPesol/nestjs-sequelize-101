import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSearchDTO } from './dto/user.search.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async search(@Query() searchDTO: UserSearchDTO) {
    return this.userService.search(searchDTO);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
