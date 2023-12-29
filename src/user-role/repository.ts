import { Injectable } from '@nestjs/common';
import { DataTypes } from 'sequelize';
import { BaseRepository } from 'src/common/repository/base.repository';
import { DatabaseService } from 'src/database/database.service';
import { RoleRepository } from 'src/role/role.repository';
import { UserRepository } from 'src/user/user.repository';
import { UserRoleDTO } from './dto/dto';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRoleDTO> {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {
    const model = databaseService.define(
      'userRole',
      {
        id: {
          type: DataTypes.NUMBER,
          primaryKey: true,
          autoIncrement: true,
        },
        // Foreign key references
        userId: {
          type: DataTypes.NUMBER,
          allowNull: false,
          references: {
            model: userRepository.getModel(),
            key: 'id',
          },
        },
        roleId: {
          type: DataTypes.NUMBER,
          allowNull: false,
          references: {
            model: roleRepository.getModel(),
            key: 'id',
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Date.now,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Date.now,
        },
      },
      { tableName: 'users_roles', underscored: true },
    );

    super(model);
  }
}
