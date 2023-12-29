import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class ProfileDTO extends BaseDTO {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'id of user role',
    example: 1,
    required: false,
  })
  id: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'id of user',
    example: 1,
    required: false,
  })
  userId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'profile image path',
    example: '/profiles/xxx.jpg',
    required: false,
  })
  profilePath: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'first name',
    example: 'Adam',
    required: false,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'last name',
    example: 'Sandler',
    required: false,
  })
  lastName: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'created at',
    example: new Date(),
    required: false,
  })
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'updated at',
    example: new Date(),
    required: false,
  })
  updatedAt: Date;

  @IsOptional()
  @ApiProperty({
    description: 'profile file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  file?: any;
}
