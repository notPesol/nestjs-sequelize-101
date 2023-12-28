import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseFilters,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDTO } from './dto/sign-in-user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @UseFilters(new HttpExceptionFilter())
  @Get('/profile')
  getProfile(@Req() request) {
    // example.
    return request?.user;
  }

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new HttpExceptionFilter())
  signIn(@Body() dto: SignInUserDTO) {
    return this.authService.signIn(dto);
  }
}
