import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { FuelExpenseEntity } from '../../../../../fuel-expenses/infrastructure/persistence/relational/entities/fuel-expense.entity';

@Entity({
  name: 'vehicule',
})
export class VehiculeEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  licensePlate: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => UserEntity, (user) => user.vehicules, {
    onDelete: 'SET NULL',
  })
  users: UserEntity[];

  @ApiProperty()
  @ManyToOne(() => FuelExpenseEntity, (fuelExpense) => fuelExpense.vehicule)
  fuelExpenses: FuelExpenseEntity[];
}
