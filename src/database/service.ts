import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Model,
  ModelAttributes,
  ModelOptions,
  ModelStatic,
  Sequelize,
} from 'sequelize';
import { IDatabase } from './interface';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private sequelize: Sequelize;

  constructor(private readonly configService: ConfigService) {
    const databaseConfig = configService.get<IDatabase>('database');
    this.sequelize = new Sequelize({
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.name,
      dialect: 'postgres',
    });
  }
  async onModuleInit() {
    this.sequelize.authenticate();
  }

  getSequelize() {
    return this.sequelize;
  }

  define(
    modelName: string,
    attributes: ModelAttributes<Model<any, any>, any>,
    options: ModelOptions<Model<any, any>> = { underscored: true },
  ): ModelStatic<Model<any, any>> {
    return this.sequelize.define(modelName, attributes, options);
  }
}
