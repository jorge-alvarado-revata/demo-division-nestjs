import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DivisionService } from './division.service';
import { ResponseDivisionDto } from './dto/response-division.dto';
import { CreateDivisionDto } from './dto/create-division.dto';
import { validate } from 'class-validator';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post('add/padre')
  async addPadre(
    @Body() division: CreateDivisionDto,
  ): Promise<ResponseDivisionDto> {
    try {
      const errors = await validate(division);
      if (errors.length > 0) {
        throw new BadRequestException('Datos de entrada invalidos.');
      }
      return this.divisionService.addPadre(division);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Get('todos')
  todos(): Promise<ResponseDivisionDto[]> {
    return this.divisionService.getTodos();
  }

  @Get('hijos/:id')
  hijosById(@Param('id') id: number): Promise<ResponseDivisionDto[]> {
    return this.divisionService.hijosById(id);
  }

  @Get('solo/:id')
  async soloById(@Param('id') id: number): Promise<ResponseDivisionDto[]> {
    const division = await this.divisionService.soloById(id);
    if (!division) {
      throw new NotFoundException('Division no encontrada');
    }
    return division;
  }

  @Put('setpadre/:id/:parentId')
  async setPadre(
    @Param('id') id: number,
    @Param('parentId') parentId: number,
  ): Promise<ResponseDivisionDto | null> {
    return this.divisionService.setPadre(id, parentId);
  }

  @Post('update/:id')
  async update(
    @Body('updateData') updateData: Partial<UpdateDivisionDto>,
  ): Promise<ResponseDivisionDto> {
    try {
      const errors = await validate(updateData);
      if (errors.length > 0) {
        throw new BadRequestException('Datos de entrada invalidos.');
      }
      return this.divisionService.updateDivision(updateData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Put('padre/add/hijo')
  async padreAddHijo(
    @Param('parentId') parentId: number,
    @Param('newChildrenData') newChildrenData: CreateDivisionDto,
  ): Promise<ResponseDivisionDto> {
    try {
      const errors = await validate(newChildrenData);
      if (errors.length > 0) {
        throw new BadRequestException('Datos de entrada invalidos.');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException();
    }
    return this.divisionService.padreAddHijo(parentId, newChildrenData);
  }

  @Put('padre/del/hijo')
  async padreDelHijo(
    @Param('parentId') parentId: number,
    @Param('divisionesId') divisionesId: number[],
  ): Promise<ResponseDivisionDto> {
    return this.divisionService.padreDelHijo(parentId, divisionesId);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<ResponseDivisionDto> {
    return this.divisionService.remove(id);
  }
}
