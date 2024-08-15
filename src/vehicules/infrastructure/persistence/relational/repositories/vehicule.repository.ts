import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculeEntity } from '../entities/vehicule.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Vehicule } from '../../../../domain/vehicule';
import { VehiculeRepository } from '../../vehicule.repository';
import { VehiculeMapper } from '../mappers/vehicule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class VehiculeRelationalRepository implements VehiculeRepository {
  constructor(
    @InjectRepository(VehiculeEntity)
    private readonly vehiculeRepository: Repository<VehiculeEntity>,
  ) {}

  async create(data: Vehicule): Promise<Vehicule> {
    const persistenceModel = VehiculeMapper.toPersistence(data);
    const newEntity = await this.vehiculeRepository.save(
      this.vehiculeRepository.create(persistenceModel),
    );
    return VehiculeMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Vehicule[]> {
    const entities = await this.vehiculeRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => VehiculeMapper.toDomain(user));
  }

  async findById(id: Vehicule['id']): Promise<NullableType<Vehicule>> {
    const entity = await this.vehiculeRepository.findOne({
      where: { id },
    });

    return entity ? VehiculeMapper.toDomain(entity) : null;
  }

  async update(
    id: Vehicule['id'],
    payload: Partial<Vehicule>,
  ): Promise<Vehicule> {
    const entity = await this.vehiculeRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.vehiculeRepository.save(
      this.vehiculeRepository.create(
        VehiculeMapper.toPersistence({
          ...VehiculeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return VehiculeMapper.toDomain(updatedEntity);
  }

  async remove(id: Vehicule['id']): Promise<void> {
    await this.vehiculeRepository.delete(id);
  }
}
