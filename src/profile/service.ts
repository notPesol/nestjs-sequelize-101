import { Injectable } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { ProfileRepository } from './repository';
import { ProfileDTO } from './dto/dto';
import { FileService } from 'src/file/service';

@Injectable()
export class ProfileService {
  private readonly folderName = 'profiles';
  constructor(private readonly repository: ProfileRepository, private readonly fileService: FileService) {}

  async create(dto: ProfileDTO) {
    const result = await this.repository.create(dto);
    const responseDTO = new ResponseDTO<ProfileDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  async update(dto: ProfileDTO, file: Express.Multer.File) {
    const fileName = await this.fileService.saveFile(file, this.folderName);
    dto.profilePath = `${this.folderName}/${fileName}`;

    let profileDTO: ProfileDTO = null;
    if (!dto.id) {
      profileDTO = await this.repository.create(dto);
    } else {
      profileDTO = await this.repository.update(dto);
    }
    const responseDTO = new ResponseDTO<ProfileDTO>();
    responseDTO.data = profileDTO;
    return responseDTO;
  }
}
