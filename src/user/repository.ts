import { Injectable } from '@nestjs/common';
import { DataTypes } from 'sequelize';
import { BaseRepository } from 'src/common/repository/base.repository';
import { DatabaseService } from 'src/database/service';
import { UserDTO } from './dto/dto';

@Injectable()
export class UserRepository extends BaseRepository<UserDTO> {
  constructor(private readonly databaseService: DatabaseService) {
    const model = databaseService.define(
      'user',
      {
        id: {
          type: DataTypes.NUMBER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
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
      { tableName: 'users', underscored: true },
    );

    super(model);
  }
}
