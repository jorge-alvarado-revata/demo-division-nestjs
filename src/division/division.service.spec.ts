import { Test, TestingModule } from '@nestjs/testing';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dto/create-division.dto';
import { Division } from '../entity/division.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DivisionService', () => {
  let service: DivisionService;

  let mockDivisionServiceRepository: {
    createDivision: jest.Mock;
    getAllDivisiones: jest.Mock;
  };

  beforeEach(async () => {
    mockDivisionServiceRepository = {
      createDivision: jest.fn(),
      getAllDivisiones: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DivisionService,
        {
          provide: getRepositoryToken(Division),
          useValue: mockDivisionServiceRepository,
        },
      ],
    }).compile();

    service = module.get<DivisionService>(DivisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe crear y devolver una division', async () => {
    const comparaUser = {
      nombre: 'RRHH',
      nivel: 1,
      colaboradores: 12,
      embajador: 'Juan Perez',
    } as CreateDivisionDto;

    const newDivision = {
      nombre: 'RRHH',
      nivel: 1,
      colaboradores: 12,
      embajador: 'Juan Perez',
    } as CreateDivisionDto;

    mockDivisionServiceRepository.createDivision(newDivision);

    expect(await service.createDivision(comparaUser)).toEqual(newDivision);
    expect(mockDivisionServiceRepository.createDivision).toHaveBeenCalledWith(
      CreateDivisionDto,
    );
  });

  it('debe retornar un array de ResponseDivision', () => {
    const result = [
      {
        nombre: 'RRHH',
        nivel: 1,
        colaboradores: 12,
        embajador: 'Juan Perez',
      },
    ];

    jest
      .spyOn(mockDivisionServiceRepository, 'getAllDivisiones')
      .mockReturnValue(result);
  });
});
