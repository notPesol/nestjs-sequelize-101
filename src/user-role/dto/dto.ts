import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsOptional } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class UserRoleDTO extends BaseDTO {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'id of user role',
    example: 1,
  })
  id: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id of user',
    example: 1,
  })
  userId: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id of role',
    example: 1,
  })
  roleId: number;

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
