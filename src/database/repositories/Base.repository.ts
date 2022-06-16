import { EntityTarget, getRepository } from 'typeorm';
import { Repository } from 'typeorm';

export default class BaseRepository {
  async getRepository<T>(entityType: EntityTarget<T>): Promise<Repository<T>> {
    return getRepository(entityType);
  }
}