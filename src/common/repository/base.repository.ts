import {
  FindAndCountOptions,
  FindOptions,
  Model,
  ModelStatic,
} from 'sequelize';

export class BaseRepository<T> {
  private readonly model: ModelStatic<Model<any, any>>;

  constructor(model: ModelStatic<Model<any, any>>) {
    this.model = model;
  }

  newObject(data: any): T {
    if (data instanceof Model) {
      return Object.assign({}, data.toJSON());
    }

    return Object.assign({}, data);
  }

  getModel() {
    return this.model;
  }

  async findAll(options?: FindOptions<any>): Promise<T[]> {
    const rows = await this.model.findAll(options);
    return rows.map((row) => this.newObject(row));
  }

  async findAndCountAll(options?: FindAndCountOptions): Promise<{
    rows: T[];
    count: number;
  }> {
    const { rows, count } = await this.model.findAndCountAll(options);

    return { rows: rows.map((row) => this.newObject(row)), count };
  }

  async read(id: string): Promise<T> {
    const data = await this.model.findOne({ where: { id } });
    return this.newObject(data);
  }

  async update(dto: any): Promise<T> {
    const data = await this.model.update(dto, {
      where: { id: dto.id },
      returning: true,
    });
    return this.newObject(data);
  }

  async delete(id: string): Promise<number> {
    return await this.model.destroy({ where: { id } });
  }
}
