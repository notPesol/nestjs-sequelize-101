import { Injectable } from '@nestjs/common';
import { DataTypes } from 'sequelize';
import { BaseRepository } from 'src/common/repository/base.repository';
import { DatabaseService } from 'src/database/service';
import { RoleDTO } from './dto/role.dto';

@Injectable()
export class RoleRepository extends BaseRepository<RoleDTO> {
  constructor(private readonly databaseService: DatabaseService) {
    const model = databaseService.define(
      'role',
      {
        id: {
          type: DataTypes.NUMBER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
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
      { tableName: 'roles', underscored: true },
    );

    super(model);
  }
}
