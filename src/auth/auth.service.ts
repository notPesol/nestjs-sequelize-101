import { UserService } from 'src/user/user.service';
import { SignInUserDTO } from './dto/sign-in-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserAssociationService } from 'src/user-association/service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAssociationService: UserAssociationService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInUserDTO) {
    const { data: userAssociation } =
      await this.userAssociationService.findByUsername(dto.username);

    if (userAssociation?.password !== dto.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: userAssociation.id,
      username: userAssociation.username,
      roles: userAssociation.roles,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    const responseDTO = new ResponseDTO<any>();
    responseDTO.data = { accessToken };

    return responseDTO;
  }
}
