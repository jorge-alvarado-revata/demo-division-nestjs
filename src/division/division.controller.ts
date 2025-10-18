import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { DivisionService } from './division.service';
import { ResponseDivisionDto } from './dto/response-division.dto';
import { CreateDivisionDto } from './dto/create-division.dto';

@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  async createDivision(
    @Body() division: CreateDivisionDto,
  ): Promise<ResponseDivisionDto> {
    return this.divisionService.createDivision(division);
  }

  @Get()
  getAllDivisiones(): Promise<ResponseDivisionDto[]> {
    return this.divisionService.getAllDivisiones();
  }

  @Get(':id')
  async getDivisionById(@Param('id') id: number): Promise<ResponseDivisionDto> {
    const division = await this.divisionService.getDivisionById(+id);
    if (!division) {
      throw new NotFoundException('Division no encontrada');
    }
    return division;
  }

  @Put()
  async asignaPadre(
    @Param('id') id: number,
    @Param('Parentid') ParentId: number,
  ): Promise<ResponseDivisionDto> {
    return this.asignaPadre(id, ParentId);
  }

  @Put()
  async updateDivision(
    @Param('id') id: number,
    @Param('updateData') updateData: Partial<CreateDivisionDto>,
  ): Promise<ResponseDivisionDto> {
    return this.updateDivision(id, updateData);
  }

  @Put()
  async agregaDivisionAPadre(
    @Param('parentId') parentId: number,
    @Param('newChildrenData') newChildrenData: CreateDivisionDto[],
  ): Promise<ResponseDivisionDto> {
    return this.agregaDivisionAPadre(parentId, newChildrenData);
  }

  @Put()
  async delDivisionAPadre(
    @Param('parentId') parentId: number,
    @Param('divisionesId') divisionesId: number[],
  ): Promise<ResponseDivisionDto> {
    return this.delDivisionAPadre(parentId, divisionesId);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    return this.remove(id);
  }
}
