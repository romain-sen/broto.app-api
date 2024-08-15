import { Injectable } from '@nestjs/common';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { VehiculeRepository } from './infrastructure/persistence/vehicule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Vehicule } from './domain/vehicule';

@Injectable()
export class VehiculesService {
  constructor(private readonly vehiculeRepository: VehiculeRepository) {}

  create(createVehiculeDto: CreateVehiculeDto) {
    return this.vehiculeRepository.create(createVehiculeDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.vehiculeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Vehicule['id']) {
    return this.vehiculeRepository.findById(id);
  }

  update(id: Vehicule['id'], updateVehiculeDto: UpdateVehiculeDto) {
    return this.vehiculeRepository.update(id, updateVehiculeDto);
  }

  remove(id: Vehicule['id']) {
    return this.vehiculeRepository.remove(id);
  }
}
