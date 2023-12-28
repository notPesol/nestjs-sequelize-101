import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { DatabaseService } from 'src/database/database.service';
import { RoleRepository } from 'src/role/role.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class UserRoleRepository {
  private model: ModelStatic<Model<any, any>>;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {
    this.model = databaseService.define(
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
            model: this.userRepository.getModel(),
            key: 'id',
          },
        },
        roleId: {
          type: DataTypes.NUMBER,
          allowNull: false,
          references: {
            model: this.roleRepository.getModel(),
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
  }

  getModel() {
    return this.model;
  }
}
