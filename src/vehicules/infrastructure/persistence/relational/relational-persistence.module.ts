import { Module } from '@nestjs/common';
import { VehiculeRepository } from '../vehicule.repository';
import { VehiculeRelationalRepository } from './repositories/vehicule.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculeEntity } from './entities/vehicule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculeEntity])],
  providers: [
    {
      provide: VehiculeRepository,
      useClass: VehiculeRelationalRepository,
    },
  ],
  exports: [VehiculeRepository],
})
export class RelationalVehiculePersistenceModule {}
