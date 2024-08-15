import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { VehiculeEntity } from '../../../../../vehicules/infrastructure/persistence/relational/entities/vehicule.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'fuel_expense',
})
export class FuelExpenseEntity extends EntityRelationalHelper {
  @ApiProperty({
    description: 'Unique identifier of the expense',
    type: String,
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID of the user who created the fuel expense',
    type: String,
    format: 'uuid',
  })
  @Column({ type: 'uuid' })
  userId: string;

  @ApiProperty({
    description: 'Date of the expense, defaults to current date',
    type: String,
    format: 'date',
    example: new Date().toISOString().split('T')[0], // Example: '2024-07-14'
  })
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  dateOfExpense: Date;

  @ApiProperty({
    description: 'Optional note about the expense',
    type: String,
    default: '',
  })
  @Column({ type: 'text', default: '' })
  note: string;

  @ApiProperty({
    description: 'Number of litres of fuel',
    type: Number,
    example: 50,
  })
  @Column({ type: 'float' })
  litres: number;

  @ApiProperty({
    description: 'Mileage at the time of expense',
    type: Number,
    example: 15000,
  })
  @Column({ type: 'float' })
  mileage: number;

  @ApiProperty({
    description: 'Total cost of the fuel expense',
    type: Number,
    example: 75.5,
  })
  @Column({ type: 'float' })
  cost: number;

  @ApiProperty({
    description: 'Vehicules associated with the fuel expense',
    type: [VehiculeEntity],
  })
  @ManyToOne(() => VehiculeEntity, (vehicule) => vehicule.fuelExpenses, {
    onDelete: 'SET NULL',
  })
  vehicule: VehiculeEntity;

  @ApiProperty({
    description: 'User who created the fuel expense',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, (user) => user.fuelExpenses, {
    onDelete: 'SET NULL',
  })
  user: UserEntity;

  @ApiProperty({
    description: 'Date when the expense record was created',
    type: String,
    format: 'date-time',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the expense record was last updated',
    type: String,
    format: 'date-time',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
