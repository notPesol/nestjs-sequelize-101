import { UserService } from 'src/user/user.service';
import { SignInUserDTO } from './dto/sign-in-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInUserDTO) {
    const { data: user } = await this.userService.findByUsername(dto.username);

    if (user?.password !== dto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    const responseDTO = new ResponseDTO<any>();
    responseDTO.data = { accessToken };

    return responseDTO;
  }
}
