import { Injectable } from '@nestjs/common';
import { CreateFuelExpenseDto } from './dto/create-fuel-expense.dto';
import { UpdateFuelExpenseDto } from './dto/update-fuel-expense.dto';
import { FuelExpenseRepository } from './infrastructure/persistence/fuel-expense.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FuelExpense } from './domain/fuel-expense';

@Injectable()
export class FuelExpensesService {
  constructor(private readonly fuelExpenseRepository: FuelExpenseRepository) {}

  create(createFuelExpenseDto: CreateFuelExpenseDto, userId: string) {
    return this.fuelExpenseRepository.create({
      ...createFuelExpenseDto,
      userId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.fuelExpenseRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: FuelExpense['id']) {
    return this.fuelExpenseRepository.findById(id);
  }

  update(id: FuelExpense['id'], updateFuelExpenseDto: UpdateFuelExpenseDto) {
    return this.fuelExpenseRepository.update(id, updateFuelExpenseDto);
  }

  remove(id: FuelExpense['id']) {
    return this.fuelExpenseRepository.remove(id);
  }
}
