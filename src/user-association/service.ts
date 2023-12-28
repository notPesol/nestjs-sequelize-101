import { Injectable } from '@nestjs/common';
import { UserAssociationRepository, VIEWS } from './repository';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserAssociationDTO } from './dto/dto';

@Injectable()
export class UserAssociationService {
  constructor(private readonly repository: UserAssociationRepository) {}

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
