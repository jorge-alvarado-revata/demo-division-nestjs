import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from '../entity/division.entity';
import { CreateDivisionDto } from './dto/create-division.dto';
import { ResponseDivisionDto } from './dto/response-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';
import { EliminaHijosDto } from './dto/elimina-hijos-division.dto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  private async saveDivision(division: CreateDivisionDto) {
    const newDivision = this.divisionRepository.create(division);
    return await this.divisionRepository.save(newDivision);
  }
  /**
   * create una nueva division
   * @param division
   * @returns
   */
  async addPadre(division: CreateDivisionDto): Promise<Division> {
    const exists = await this.divisionRepository.findOne({
      where: { nombre: division.nombre },
    });
    if (exists) {
      throw new ConflictException('Ya existe una Division con ese nombre');
    }
    const newDivision = this.divisionRepository.create(division);
    return await this.divisionRepository.save(newDivision);
  }

  /**
   * Obtiene el listado de todos las divisiones
   * @returns {Promise<Division[]>}
   */
  async getTodos(): Promise<Division[]> {
    return this.divisionRepository.find({
      relations: ['divisiones', 'parent'],
    });
  }
  /**
   * Obtiene la lista de divisiones
   * @param {number} id
   * @returns {Promise<Division[]>}
   */
  async soloById(id: number): Promise<Division> {
    try {
      const division = await this.divisionRepository.findOneOrFail({
        where: { id: id },
        relations: ['divisiones', 'parent'],
      });

      return division;
    } catch {
      throw new NotFoundException('Division no encontrada');
    }
  }

  /**
   * Obtiene la lista de hijos de una division
   * @param {number} id
   * @returns {Promise<Division[]>}
   */
  async hijosById(id: number): Promise<Division[]> {
    try {
      const division = await this.divisionRepository.findOneOrFail({
        where: { id: id },
        relations: ['divisiones'],
      });
      return division.divisiones;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Division no encontrada');
    }
  }

  /**
   * Asigna un padre a una Division identificada por su Id
   * @param {number} id
   * @param {Division} parentId
   * @returns Promise<Division | null>
   */
  async setPadre(id: number, parentId: number): Promise<Division | null> {
    try {
      if (id == parentId) {
        throw new BadRequestException(
          'No se puede asignar el mismo elemento como padre.',
        );
      }
      const division = await this.divisionRepository.findOneByOrFail({
        id: id,
      });

      const divisionPadre = await this.divisionRepository.findOneByOrFail({
        id: parentId,
      });

      division.parent = divisionPadre;
      await this.divisionRepository.save(division);
      return division;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'No se puede asignar el mismo elemento como padre.',
        );
      } else {
        throw new NotFoundException('Una de las divisiones no fue encontrada');
      }
    }
  }

  /**
   * Actualiza una division con nuevos datos
   * @param id
   * @param updatedData
   * @returns
   */

  async update(id: number, updatedData: UpdateDivisionDto): Promise<Division> {
    try {
      const parent = await this.divisionRepository.findOneBy({ id });
      if (!parent) {
        throw new NotFoundException('Division no encontrada');
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!updatedData.nombre) {
        const exists = await this.divisionRepository.findOne({
          where: { nombre: updatedData.nombre },
        });
        if (exists) {
          throw new ConflictException('Ya existe una Division con ese nombre');
        }
      }
      Object.assign(parent, updatedData);
      const updatedDivision = await this.divisionRepository.save(parent);
      return updatedDivision;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Division no encontrada');
      } else {
        throw new NotImplementedException(
          'Una de las divisiones no fue encontrada',
        );
      }
    }
  }

  /**
   * Agrega una nueva division a un Padre
   * @param parentId
   * @param newChildrenData
   * @returns
   */
  async agrega(newChildrenData: CreateDivisionDto): Promise<Division> {
    const parentId = newChildrenData.parentId;
    if (parentId) {
      const parent = await this.divisionRepository.findOne({
        where: { id: parentId },
        relations: ['divisiones'],
      });
      if (!parent) {
        throw new NotFoundException('Padre no encontrado');
      }
      const exists = await this.divisionRepository.findOne({
        where: { nombre: newChildrenData.nombre },
      });
      if (exists) {
        throw new ConflictException('Ya existe una Division con ese nombre');
      }
      const newChildren = await this.saveDivision(newChildrenData);
      parent.divisiones.push(newChildren);
      await this.divisionRepository.save(parent);
      return newChildren;
    } else {
      const newChildren = await this.saveDivision(newChildrenData);
      return newChildren;
    }
  }

  /**
   * Retira hijos de un padre
   * @param parentId
   * @param divisionesId
   * @returns
   */
  async padreDelHijos(eliminaHijos: EliminaHijosDto): Promise<Division> {
    const parentId = eliminaHijos.id;
    const hijos = eliminaHijos.lista;
    const parent = await this.divisionRepository.findOne({
      where: { id: parentId },
      relations: ['divisiones'],
    });
    if (!parent) {
      throw new NotFoundException('Padre no encontrado');
    }

    parent.divisiones = parent.divisiones.filter(
      (child) => !hijos.includes(child.id),
    );
    await this.divisionRepository.save(parent);
    return parent;
  }

  /**
   * elimina una division
   * @param id
   */
  async remove(id: number): Promise<ResponseDivisionDto> {
    try {
      const divisionToRemove = await this.divisionRepository.findOneOrFail({
        where: { id: id },
      });
      if (!divisionToRemove) {
        throw new NotFoundException('Division no encontrada');
      }
      return await this.divisionRepository.remove(divisionToRemove);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Division no encontrada');
      } else {
        throw new NotImplementedException('Un error no identificado');
      }
    }
  }
}
