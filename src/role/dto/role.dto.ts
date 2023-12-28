import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RoleDTO {
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id of user',
    example: 36,
  })
  id: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'role name',
    example: 'admin',
    required: true,
  })
  name: string;

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
