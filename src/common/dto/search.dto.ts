import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class SearchDTO {
  @IsBoolean()
  @Type(() => Boolean)
  count: boolean = false;

  @IsBoolean()
  @Type(() => Boolean)
  ignorePage: boolean = false;

  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  limit: number = 20;

  @IsString()
  @Type(() => String)
  query: string = '';

  @IsString()
  @Type(() => String)
  orderBy: string = '';

  @IsString()
  @Type(() => String)
  orderType: 'ASC' | 'DESC' | '' = '';

  @IsString()
  @Type(() => String)
  between: string = '';

  @IsString()
  @Type(() => String)
  betweenBy: string = '';

  getBetweenStart() {
    return this.between.split(',')[0];
  }
  getBetweenEnd() {
    return this.between.split(',')[1];
  }
}
