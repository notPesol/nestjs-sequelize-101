import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UserDTO {
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

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'isActive',
    example: true,
  })
  isActive: boolean;

  @IsDate()
  @ApiProperty({
    description: 'created at',
    example: new Date(),
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'updated at',
    example: new Date(),
  })
  updatedAt: Date;
}
