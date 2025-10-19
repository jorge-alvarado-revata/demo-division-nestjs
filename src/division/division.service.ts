import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from '../entity/division.entity';
import { CreateDivisionDto } from './dto/create-division.dto';
import { ResponseDivisionDto } from './dto/response-division.dto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  /**
   * create una nueva division
   * @param division
   * @returns
   */
  async addPadre(division: CreateDivisionDto): Promise<Division> {
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
  async soloById(id: number): Promise<Division | null> {
    return this.divisionRepository.findOneBy({ id });
  }

  /**
   * Obtiene la lista de divisiones
   * @param {number} id
   * @returns {Promise<Division[]>}
   */
  async hijosById(id: number): Promise<Division[]> {
    return this.divisionRepository.find({
      where: { id: id },
      relations: ['divisiones'],
    });
  }

  /**
   * Asigna un padre a una Division identificada por su Id
   * @param {number} id
   * @param {Division} parent
   * @returns Promise<Division | null>
   */
  async setPadre(id: number, parentId: number): Promise<Division | null> {
    if (id == parentId) {
      throw new BadRequestException(
        'No se puede asignar el mismo elemento como padre.',
      );
    }
    const division = await this.divisionRepository.findOneBy({ id: id });
    if (!division) {
      throw new NotFoundException('Division no encontrada');
    }
    const divisionPadre = await this.divisionRepository.findOneBy({
      id: parentId,
    });
    if (!divisionPadre) {
      throw new NotFoundException('Division Padre no encontrada');
    }

    division.parent = divisionPadre;
    await this.divisionRepository.save(division);
    return division;
  }

  /**
   * Actualiza una division con nuevos datos
   * @param id
   * @param updatedData
   * @returns
   */

  async updateDivision(
    id: number,
    updatedData: Partial<CreateDivisionDto>,
  ): Promise<Division> {
    const parent = await this.divisionRepository.findOneBy({ id });
    if (!parent) {
      throw new Error('Division no encontrada');
    }
    Object.assign(parent, updatedData);
    return this.divisionRepository.save(parent);
  }

  /**
   * Agrega una nueva division a un Padre
   * @param parentId
   * @param newChildrenData
   * @returns
   */
  async padreAddHijo(
    parentId: number,
    newChildrenData: CreateDivisionDto,
  ): Promise<Division> {
    const parent = await this.divisionRepository.findOne({
      where: { id: parentId },
      relations: ['divisiones'],
    });
    if (!parent) {
      throw new NotFoundException('Padre no encontrado');
    }
    const newChildren = this.divisionRepository.create(newChildrenData);
    parent.divisiones.push(newChildren);
    await this.divisionRepository.save(parent);
    return parent;
  }

  /**
   * Retira hijos de un padre
   * @param parentId
   * @param divisionesId
   * @returns
   */
  async padreDelHijo(
    parentId: number,
    divisionesId: number[],
  ): Promise<Division> {
    const parent = await this.divisionRepository.findOne({
      where: { id: parentId },
      relations: ['divisiones'],
    });
    if (!parent) {
      throw new NotFoundException('Padre no encontrado');
    }

    parent.divisiones = parent.divisiones.filter(
      (child) => !divisionesId.includes(child.id),
    );
    await this.divisionRepository.save(parent);
    return parent;
  }

  /**
   * elimina una division
   * @param id
   */
  async remove(id: number): Promise<ResponseDivisionDto> {
    const divisionToRemove = await this.divisionRepository.findOne({
      where: { id: id },
    });
    if (!divisionToRemove) {
      throw new NotFoundException('Division no encontrada');
    }
    return this.divisionRepository.remove(divisionToRemove);
  }
}
