import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from '../entity/division.entity';
import { CreateDivisionDto } from './dto/create-division.dto';

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
  async createDivision(division: CreateDivisionDto): Promise<Division> {
    const newDivision = this.divisionRepository.create(division);
    return await this.divisionRepository.save(newDivision);
  }

  async getAllDivisiones(): Promise<Division[]> {
    return this.divisionRepository.find({
      relations: ['divisiones', 'parent'],
    });
  }
  /**
   * Obtiene la lista de divisiones
   * @param {number} id
   * @returns {Promise<Division[]>}
   */
  async getDivisionById(id: number): Promise<Division | null> {
    return this.divisionRepository.findOneBy({ id });
  }

  /**
   * Asigna un padre a una Division identificada por su Id
   * @param {number} id
   * @param {Division} parent
   * @returns Promise<Division | null>
   */
  async asignaPadre(id: number, parentId: number): Promise<Division | null> {
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
  async agregaDivisionAPadre(
    parentId: number,
    newChildrenData: CreateDivisionDto[],
  ): Promise<Division> {
    const parent = await this.divisionRepository.findOne({
      where: { id: parentId },
      relations: ['divisiones'],
    });
    if (!parent) {
      throw new NotFoundException('Padre no encontrado');
    }

    const newChildren = newChildrenData.map((data) =>
      this.divisionRepository.create(data),
    );
    parent.divisiones = [...parent.divisiones, ...newChildren];
    await this.divisionRepository.save(parent);
    return parent;
  }

  /**
   * Elimina una division de un padre
   * @param parentId
   * @param divisionesId
   * @returns
   */
  async delDivisionAPadre(
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
  async remove(id: number): Promise<void> {
    await this.divisionRepository.delete(id);
  }
}
