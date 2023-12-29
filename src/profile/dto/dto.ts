import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class ProfileDTO extends BaseDTO {
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

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'profile image path',
    example: '/profiles/xxx.jpg',
  })
  profilePath: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'first name',
    example: 'Adam',
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'last name',
    example: 'Sandler',
  })
  lastName: string;

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
