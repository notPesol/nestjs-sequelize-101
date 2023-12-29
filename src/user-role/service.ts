import { Injectable } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserRoleRepository } from './repository';
import { UserRoleDTO } from './dto/dto';

@Injectable()
export class UserRoleService {
  constructor(private readonly repository: UserRoleRepository) {}

  async create(dto: UserRoleDTO) {
    const result = await this.repository.create(dto);
    const responseDTO = new ResponseDTO<UserRoleDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
