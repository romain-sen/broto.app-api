import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Vehicule } from '../../domain/vehicule';

export abstract class VehiculeRepository {
  abstract create(
    data: Omit<Vehicule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Vehicule>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Vehicule[]>;

  abstract findById(id: Vehicule['id']): Promise<NullableType<Vehicule>>;

  abstract update(
    id: Vehicule['id'],
    payload: DeepPartial<Vehicule>,
  ): Promise<Vehicule | null>;

  abstract remove(id: Vehicule['id']): Promise<void>;
}
