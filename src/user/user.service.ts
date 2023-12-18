import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './dto/user.dto';
import { UserSearchDTO } from './dto/user.search.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FindOptions, Op, WhereOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async search(searchDTO: UserSearchDTO) {
    const options: FindOptions = {};
    const where: WhereOptions = {};

    if (searchDTO.between && searchDTO.betweenBy) {
      const start = searchDTO.getBetweenStart();
      const end = searchDTO.getBetweenEnd();

      where[searchDTO.betweenBy] = {
        [Op.between]: [start, end],
      };
    }

    if (searchDTO.query) {
      where.username = { [Op.iLike]: `%${searchDTO.query}%` };
    }

    if (searchDTO.orderBy) {
      options.order = [[searchDTO.orderBy, searchDTO.orderType]];
    }

    if (!searchDTO.ignorePage) {
      options.offset = (searchDTO.page - 1) * searchDTO.limit;
      options.limit = searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<UserDTO[]>();
    if (searchDTO.count) {
      const { rows, count } = await this.userRepository.findAndCountAll({
        where,
        ...options,
      });
      responseDTO.data = rows;
      responseDTO.count = count;
    } else {
      const rows = await this.userRepository.findAll({ where, ...options });
      responseDTO.data = rows;
    }

    return responseDTO;
  }

  async getById(id: string) {
    const responseDTO = new ResponseDTO<UserDTO>();
    responseDTO.data = await this.userRepository.read(id);
    return responseDTO;
  }
}
