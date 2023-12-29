import { Injectable } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { ProfileRepository } from './repository';
import { ProfileDTO } from './dto/dto';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async create(dto: ProfileDTO) {
    const result = await this.repository.create(dto);
    const responseDTO = new ResponseDTO<ProfileDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  async update(dto: ProfileDTO) {
    const result = await this.repository.update(dto);
    const responseDTO = new ResponseDTO<ProfileDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
