import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class UserDTO extends BaseDTO {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'id of user',
    example: 36,
  })
  id: number;

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
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'isActive',
    example: true,
  })
  isActive: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: 'created at',
    example: new Date(),
  })
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: 'updated at',
    example: new Date(),
  })
  updatedAt: Date;
}
