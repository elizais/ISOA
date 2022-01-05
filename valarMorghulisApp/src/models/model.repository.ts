import { DeepPartial, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class ModelRepository<T> extends Repository<T> {
  async get(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<T | null> {
    return await this.findOne({
      where: { id },
      relations,
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity ?? null);
      })
      .catch((error) => Promise.reject(error));
  }

  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<T> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    id: number,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<T> {
    return this.update(id, inputs)
      .then(async () => await this.get(id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateDescription(name: string, input: DeepPartial<T>): Promise<T> {
    return this.update(name, input)
      .then(async () => await this.findOne(name))
      .catch((error) => Promise.reject(error));
  }
}
