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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UpdateDivisionDto } from './dto/update-division.dto';

@ApiTags('divisiones')
@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post('add/padre')
  @ApiOperation({ summary: 'Crear division' })
  @ApiOkResponse({ type: CreateDivisionDto })
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
  @ApiOperation({ summary: 'obtiene todas las divisiones' })
  @ApiOkResponse({
    description: 'Una lista de todas las divisiones',
    schema: {
      type: 'array',
      items: {
        oneOf: [{ $ref: getSchemaPath(ResponseDivisionDto) }],
      },
    },
  })
  todos(): Promise<ResponseDivisionDto[]> {
    return this.divisionService.getTodos();
  }

  @Get('hijos/:id')
  @ApiOperation({ summary: 'obtiene los hijos de una division por Id' })
  @ApiOkResponse({
    description: 'Lista de hijos de una division',
    type: ResponseDivisionDto,
    isArray: true,
  })
  hijosById(@Param('id') id: number): Promise<ResponseDivisionDto[]> {
    return this.divisionService.hijosById(id);
  }

  @Get('solo/:id')
  @ApiOperation({ summary: 'obtiene una division con su padre e hijos' })
  @ApiOkResponse({
    description: 'Obtiene un elemento con padre e hijos',
    type: ResponseDivisionDto,
  })
  async soloById(@Param('id') id: number): Promise<ResponseDivisionDto> {
    const division = await this.divisionService.soloById(id);
    if (!division) {
      throw new NotFoundException('Division no encontrada');
    }
    return division;
  }

  @Put('setpadre/:id/:parentId')
  @ApiOperation({ summary: 'asigna un padre a una division' })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async setPadre(
    @Param('id') id: number,
    @Param('parentId') parentId: number,
  ): Promise<ResponseDivisionDto | null> {
    return this.divisionService.setPadre(id, parentId);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'actualiza datos de una division' })
  @ApiBody({ type: UpdateDivisionDto })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateDivisionDto,
  ): Promise<ResponseDivisionDto> {
    try {
      const errors = await validate(updateData);
      if (errors.length > 0) {
        throw new BadRequestException('Datos de entrada invalidos.');
      }
      return this.divisionService.updateDivision(id, updateData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Put('padre/add/:parentId')
  @ApiOperation({ summary: 'agrega un hijo a un padre' })
  @ApiBody({ type: CreateDivisionDto })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async padreAddHijo(
    @Param('parentId') parentId: number,
    @Body() newChildrenData: CreateDivisionDto,
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

  @Put('padre/retira:parentId')
  @ApiOperation({ summary: 'retira un hijo a un padre' })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async padreDelHijo(
    @Param('parentId') parentId: number,
    @Param('divisionesId') divisionesId: number[],
  ): Promise<ResponseDivisionDto> {
    return this.divisionService.padreDelHijos(parentId, divisionesId);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'elimina una division' })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async remove(@Param('id') id: number): Promise<ResponseDivisionDto> {
    return this.divisionService.remove(id);
  }
}
