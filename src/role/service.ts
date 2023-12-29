import { Injectable } from '@nestjs/common';
import { RoleRepository } from './repository';
import { RoleDTO } from './dto/role.dto';
import { RoleSearchDTO } from './dto/search-role.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FindOptions, Op, WhereOptions } from 'sequelize';
import { CreateRoleDTO } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async delete(id: string) {
    const result = await this.roleRepository.delete(id);
    const responseDTO = new ResponseDTO<Number>();
    responseDTO.data = result;
    return responseDTO;
  }

  async update(dto: CreateRoleDTO) {
    const result = await this.roleRepository.update(dto);
    const responseDTO = new ResponseDTO<RoleDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  async create(dto: CreateRoleDTO) {
    const result = await this.roleRepository.create(dto);
    const responseDTO = new ResponseDTO<RoleDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  async search(searchDTO: RoleSearchDTO) {
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

    const responseDTO = new ResponseDTO<RoleDTO[]>();
    if (searchDTO.count) {
      const { rows, count } = await this.roleRepository.findAndCountAll({
        where,
        ...options,
      });
      responseDTO.data = rows;
      responseDTO.count = count;
    } else {
      const rows = await this.roleRepository.findAll({ where, ...options });
      responseDTO.data = rows;
    }

    return responseDTO;
  }

  async getById(id: string) {
    const responseDTO = new ResponseDTO<RoleDTO>();
    responseDTO.data = await this.roleRepository.read(id);
    return responseDTO;
  }

  async findByUsername(username: string) {
    const model = await this.roleRepository
      .getModel()
      .findOne({ where: { username, isActive: true } });

    const responseDTO = new ResponseDTO<RoleDTO>();
    responseDTO.data = this.roleRepository.newObject(model);

    return responseDTO;
  }
}
