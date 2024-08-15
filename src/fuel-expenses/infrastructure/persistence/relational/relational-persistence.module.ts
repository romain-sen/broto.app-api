import { Module } from '@nestjs/common';
import { FuelExpenseRepository } from '../fuel-expense.repository';
import { FuelExpenseRelationalRepository } from './repositories/fuel-expense.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelExpenseEntity } from './entities/fuel-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FuelExpenseEntity])],
  providers: [
    {
      provide: FuelExpenseRepository,
      useClass: FuelExpenseRelationalRepository,
    },
  ],
  exports: [FuelExpenseRepository],
})
export class RelationalFuelExpensePersistenceModule {}
