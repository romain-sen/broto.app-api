import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuelExpenseEntity } from '../entities/fuel-expense.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FuelExpense } from '../../../../domain/fuel-expense';
import { FuelExpenseRepository } from '../../fuel-expense.repository';
import { FuelExpenseMapper } from '../mappers/fuel-expense.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class FuelExpenseRelationalRepository implements FuelExpenseRepository {
  constructor(
    @InjectRepository(FuelExpenseEntity)
    private readonly fuelExpenseRepository: Repository<FuelExpenseEntity>,
  ) {}

  async create(data: FuelExpense): Promise<FuelExpense> {
    const persistenceModel = FuelExpenseMapper.toPersistence(data);
    const newEntity = await this.fuelExpenseRepository.save(
      this.fuelExpenseRepository.create(persistenceModel),
    );
    return FuelExpenseMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<FuelExpense[]> {
    const entities = await this.fuelExpenseRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => FuelExpenseMapper.toDomain(user));
  }

  async findById(id: FuelExpense['id']): Promise<NullableType<FuelExpense>> {
    const entity = await this.fuelExpenseRepository.findOne({
      where: { id },
    });

    return entity ? FuelExpenseMapper.toDomain(entity) : null;
  }

  async update(
    id: FuelExpense['id'],
    payload: Partial<FuelExpense>,
  ): Promise<FuelExpense> {
    const entity = await this.fuelExpenseRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.fuelExpenseRepository.save(
      this.fuelExpenseRepository.create(
        FuelExpenseMapper.toPersistence({
          ...FuelExpenseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return FuelExpenseMapper.toDomain(updatedEntity);
  }

  async remove(id: FuelExpense['id']): Promise<void> {
    await this.fuelExpenseRepository.delete(id);
  }
}
