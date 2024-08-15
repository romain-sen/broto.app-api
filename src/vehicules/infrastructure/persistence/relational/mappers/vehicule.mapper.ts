import { Vehicule } from '../../../../domain/vehicule';
import { VehiculeEntity } from '../entities/vehicule.entity';

export class VehiculeMapper {
  static toDomain(raw: VehiculeEntity): Vehicule {
    const domainEntity = new Vehicule();
    domainEntity.name = raw.name;
    domainEntity.licensePlate = raw.licensePlate;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Vehicule): VehiculeEntity {
    const persistenceEntity = new VehiculeEntity();
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.licensePlate = domainEntity.licensePlate;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
