import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { SearchDTO } from 'src/common/dto/search.dto';

export class UserAssociationSearchDTO extends SearchDTO {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'user id',
    example: 1,
    type: Number,
    required: false,
  })
  userId: number = 0;
}
