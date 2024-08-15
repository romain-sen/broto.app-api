// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateFuelExpenseDto } from './create-fuel-expense.dto';

export class UpdateFuelExpenseDto extends PartialType(CreateFuelExpenseDto) {}
