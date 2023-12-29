import { Injectable } from '@nestjs/common';
import { DataTypes } from 'sequelize';
import { BaseRepository } from 'src/common/repository/base.repository';
import { DatabaseService } from 'src/database/database.service';
import { UserRepository } from 'src/user/user.repository';
import { ProfileDTO } from './dto/dto';

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileDTO> {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userRepository: UserRepository,
  ) {
    const model = databaseService.define(
      'profile',
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
        profilePath: {
          type: DataTypes.STRING,
        },
        firstName: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
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
      { tableName: 'profiles', underscored: true },
    );

    super(model);
  }
}
