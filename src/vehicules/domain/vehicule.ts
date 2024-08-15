import { ApiProperty } from '@nestjs/swagger';

export class Vehicule {
  @ApiProperty()
  name: string;

  @ApiProperty()
  licensePlate: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
