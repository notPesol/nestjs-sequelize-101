import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRoleService } from 'src/user-role/service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRoleDTO } from 'src/user-role/dto/dto';

@Injectable()
export class UserBLL {
  constructor(
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
  ) {}

  async create(dto: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const { data: user } = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const userRoleDTO = new UserRoleDTO({
      userId: user.id,
      roleId: dto.roleId,
    });
    await this.userRoleService.create(userRoleDTO);

    const responseDTO = new ResponseDTO<UserDTO>();
    responseDTO.data = user;
    return responseDTO;
  }
}
