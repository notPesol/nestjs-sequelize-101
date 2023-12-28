import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'role name',
    example: 'admin',
    required: true,
  })
  name: string;
}
