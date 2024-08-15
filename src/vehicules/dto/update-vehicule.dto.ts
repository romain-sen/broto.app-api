// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateVehiculeDto } from './create-vehicule.dto';

export class UpdateVehiculeDto extends PartialType(CreateVehiculeDto) {}
