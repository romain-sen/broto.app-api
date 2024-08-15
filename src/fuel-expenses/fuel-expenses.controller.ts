import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  Logger,
} from '@nestjs/common';
import { FuelExpensesService } from './fuel-expenses.service';
import { CreateFuelExpenseDto } from './dto/create-fuel-expense.dto';
import { UpdateFuelExpenseDto } from './dto/update-fuel-expense.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FuelExpense } from './domain/fuel-expense';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllFuelExpensesDto } from './dto/find-all-fuel-expenses.dto';

@ApiTags('Fuelexpenses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'fuel-expenses',
  version: '1',
})
export class FuelExpensesController {
  constructor(private readonly fuelExpensesService: FuelExpensesService) {}

  @Post()
  @ApiCreatedResponse({
    type: FuelExpense,
  })
  create(@Body() createFuelExpenseDto: CreateFuelExpenseDto, @Req() req: any) {
    Logger.log('req.user', req.user);
    return this.fuelExpensesService.create(createFuelExpenseDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(FuelExpense),
  })
  async findAll(
    @Query() query: FindAllFuelExpensesDto,
  ): Promise<InfinityPaginationResponseDto<FuelExpense>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.fuelExpensesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: FuelExpense,
  })
  findOne(@Param('id') id: string) {
    return this.fuelExpensesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: FuelExpense,
  })
  update(
    @Param('id') id: string,
    @Body() updateFuelExpenseDto: UpdateFuelExpenseDto,
  ) {
    return this.fuelExpensesService.update(id, updateFuelExpenseDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.fuelExpensesService.remove(id);
  }
}
