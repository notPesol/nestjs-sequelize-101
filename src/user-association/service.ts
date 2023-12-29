import { Injectable } from '@nestjs/common';
import { UserAssociationRepository, VIEWS } from './repository';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserAssociationDTO } from './dto/dto';
import { UserAssociationSearchDTO } from './dto/search.dto';
import { FindOptions, Op, WhereOptions } from 'sequelize';

@Injectable()
export class UserAssociationService {
  constructor(private readonly repository: UserAssociationRepository) {}

  async search(view: VIEWS, searchDTO: UserAssociationSearchDTO) {
    const { repo, include } = this.repository.getRepoAndInclude(view);

    const options: FindOptions = {};
    const where: WhereOptions = {};

    if (searchDTO.between && searchDTO.betweenBy) {
      const start = searchDTO.getBetweenStart();
      const end = searchDTO.getBetweenEnd();

      where[searchDTO.betweenBy] = {
        [Op.between]: [start, end],
      };
    }

    // Simple example
    if (searchDTO.userId) {
      where.id = searchDTO.userId;
    }

    if (searchDTO.orderBy) {
      options.order = [[searchDTO.orderBy, searchDTO.orderType]];
    }

    if (!searchDTO.ignorePage) {
      options.offset = (searchDTO.page - 1) * searchDTO.limit;
      options.limit = searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<UserAssociationDTO[]>();

    if (searchDTO.count) {
      const { count, rows } = await repo
        .getModel()
        .findAndCountAll({ where, ...options, include });
      (responseDTO.count = count), (responseDTO.data = Object.assign([], rows));
    } else {
      const rows = await repo
        .getModel()
        .findAll({ where, ...options, include });
      responseDTO.data = Object.assign([], rows);
    }

    return responseDTO;
  }

  async findByUsername(username: string) {
    const { repo, include } = this.repository.getRepoAndInclude(
      VIEWS.USER_ROLES,
    );

    const model = await repo
      .getModel()
      .findOne({ where: { username }, include });

    const responseDTO = new ResponseDTO<UserAssociationDTO>();
    responseDTO.data = new UserAssociationDTO(model);

    return responseDTO;
  }
}
