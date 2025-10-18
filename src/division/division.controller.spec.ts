import { Test, TestingModule } from '@nestjs/testing';
import { DivisionController } from './division.controller';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dto/create-division.dto';

describe('DivisionController', () => {
  let controller: DivisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DivisionController],
      providers: [
        {
          provide: DivisionService,
          useValue: {
            createDivision: jest.fn(() => {
              const division = {
                nombre: 'RRHH',
                nivel: 1,
                colaboradores: 12,
                embajador: 'Juan Perez',
              };
              return division;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<DivisionController>(DivisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debe retornar una division creada', () => {
    // Call the controller method
    const result = controller.createDivision({
      nombre: 'RRHH',
      nivel: 1,
      colaboradores: 12,
      embajador: 'Juan Perez',
    } as CreateDivisionDto);

    expect(result).toEqual({
      nombre: 'RRHH',
      nivel: 1,
      colaboradores: 12,
      embajador: 'Juan Perez',
    });
  });
});
