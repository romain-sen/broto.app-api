import { Module } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { VehiculesController } from './vehicules.controller';
import { RelationalVehiculePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalVehiculePersistenceModule],
  controllers: [VehiculesController],
  providers: [VehiculesService],
  exports: [VehiculesService, RelationalVehiculePersistenceModule],
})
export class VehiculesModule {}
