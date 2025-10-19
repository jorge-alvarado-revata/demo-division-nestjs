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
import { EliminaHijosDto } from './dto/elimina-hijos-division.dto';

@ApiTags('divisiones')
@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post('agrega')
  @ApiOperation({ summary: 'agrega una nueva division con o sin padre' })
  @ApiBody({ type: CreateDivisionDto })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async agrega(
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
    return this.divisionService.agrega(newChildrenData);
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
      return this.divisionService.update(id, updateData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Post('padre/retira')
  @ApiOperation({ summary: 'retira uno o muchos hijos a un padre' })
  @ApiBody({ type: EliminaHijosDto })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async padreDelHijo(
    @Body() eliminaHijos: EliminaHijosDto,
  ): Promise<ResponseDivisionDto> {
    return this.divisionService.padreDelHijos(eliminaHijos);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'elimina una division' })
  @ApiOkResponse({ type: ResponseDivisionDto })
  async remove(@Param('id') id: number): Promise<ResponseDivisionDto> {
    return this.divisionService.remove(id);
  }
}
