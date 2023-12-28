import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class SearchDTO {
  @IsBoolean()
  @Type(() => Boolean)
  @Transform((params) => params.value === 'true')
  @ApiProperty({
    type: Boolean,
    example: false,
    required: false,
  })
  count: boolean = false;

  @IsBoolean()
  @Type(() => Boolean)
  @Transform((params) => params.value === 'true')
  @ApiProperty({
    type: Boolean,
    example: false,
    required: false,
  })
  ignorePage: boolean = false;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    example: 20,
    required: false,
  })
  limit: number = 20;

  @IsString()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  query: string = '';

  @IsString()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  orderBy: string = '';

  @IsString()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  orderType: 'ASC' | 'DESC' | '' = '';

  @IsString()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  between: string = '';

  @IsString()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: '',
    required: false,
  })
  betweenBy: string = '';

  getBetweenStart() {
    return this.between.split(',')[0];
  }
  getBetweenEnd() {
    return this.between.split(',')[1];
  }
}
