import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { FuelExpense } from '../../domain/fuel-expense';

export abstract class FuelExpenseRepository {
  abstract create(
    data: Omit<FuelExpense, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FuelExpense>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<FuelExpense[]>;

  abstract findById(id: FuelExpense['id']): Promise<NullableType<FuelExpense>>;

  abstract update(
    id: FuelExpense['id'],
    payload: DeepPartial<FuelExpense>,
  ): Promise<FuelExpense | null>;

  abstract remove(id: FuelExpense['id']): Promise<void>;
}
