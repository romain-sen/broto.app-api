import { ApiProperty } from '@nestjs/swagger';

export class FuelExpense {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  dateOfExpense: Date;

  @ApiProperty()
  note: string;

  @ApiProperty()
  litres: number;

  @ApiProperty()
  mileage: number;

  @ApiProperty()
  cost: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
