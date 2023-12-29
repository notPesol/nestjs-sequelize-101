import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { ProfileDTO } from 'src/profile/dto/dto';
import { RoleDTO } from 'src/role/dto/role.dto';
import { UserDTO } from 'src/user/dto/dto';

export class UserAssociationDTO extends UserDTO {
  @IsArray()
  @ApiProperty({
    description: 'roles array',
    type: () => [RoleDTO]
  })
  roles?: RoleDTO[];

  @IsObject()
  @ApiProperty({
    description: 'profile',
    type: () => ProfileDTO,
  })
  profile?: ProfileDTO;
}
