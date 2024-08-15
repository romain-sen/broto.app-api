import { Module } from '@nestjs/common';
import { FuelExpensesService } from './fuel-expenses.service';
import { FuelExpensesController } from './fuel-expenses.controller';
import { RelationalFuelExpensePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalFuelExpensePersistenceModule],
  controllers: [FuelExpensesController],
  providers: [FuelExpensesService],
  exports: [FuelExpensesService, RelationalFuelExpensePersistenceModule],
})
export class FuelExpensesModule {}
