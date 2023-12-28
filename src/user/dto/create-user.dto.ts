import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'username',
    example: 'username001',
    required: true,
  })
  username: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'password',
    example: 'password001',
    required: true,
  })
  password: string;
}
