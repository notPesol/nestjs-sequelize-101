import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNumber()
  @Transform((params) => params?.value || 2)
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'role id',
    example: 2,
    required: false,
  })
  roleId: number = 2;
}
