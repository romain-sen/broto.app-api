import {
  IsDate,
  // decorators here
  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateFuelExpenseDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  dateOfExpense: Date;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsNumber()
  litres: number;

  @ApiProperty()
  @IsNumber()
  mileage: number;

  @ApiProperty()
  @IsNumber()
  cost: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
