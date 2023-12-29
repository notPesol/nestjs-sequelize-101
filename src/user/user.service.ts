import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './dto/user.dto';
import { UserSearchDTO } from './dto/search-user.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FindOptions, Op, WhereOptions } from 'sequelize';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ROLES } from 'src/role/enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    const responseDTO = new ResponseDTO<Number>();
    responseDTO.data = result;
    return responseDTO;
  }

  async update(dto: CreateUserDTO, req: any) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    let isCanUpdate =
      req?.user?.roles?.includes(ROLES.ADMIN) ||
      dto?.username === req?.user?.username;

    if (!isCanUpdate) {
      throw new ForbiddenException();
    }

    const result = await this.userRepository.update(
      { ...dto, password: hashedPassword },
      { username: dto.username },
    );

    const responseDTO = new ResponseDTO<UserDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  async create(dto: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const result = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const responseDTO = new ResponseDTO<UserDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

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

  async findByUsername(username: string) {
    const model = await this.userRepository
      .getModel()
      .findOne({ where: { username, isActive: true } });

    const responseDTO = new ResponseDTO<UserDTO>();
    responseDTO.data = this.userRepository.newObject(model);

    return responseDTO;
  }
}
