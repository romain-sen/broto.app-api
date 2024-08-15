import { FuelExpense } from '../../../../domain/fuel-expense';
import { FuelExpenseEntity } from '../entities/fuel-expense.entity';

export class FuelExpenseMapper {
  static toDomain(raw: FuelExpenseEntity): FuelExpense {
    const domainEntity = new FuelExpense();
    domainEntity.userId = raw.userId;
    domainEntity.dateOfExpense = raw.dateOfExpense;
    domainEntity.note = raw.note;
    domainEntity.litres = raw.litres;
    domainEntity.mileage = raw.mileage;
    domainEntity.cost = raw.cost;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: FuelExpense): FuelExpenseEntity {
    const persistenceEntity = new FuelExpenseEntity();
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.dateOfExpense = domainEntity.dateOfExpense;
    persistenceEntity.note = domainEntity.note;
    persistenceEntity.litres = domainEntity.litres;
    persistenceEntity.mileage = domainEntity.mileage;
    persistenceEntity.cost = domainEntity.cost;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
