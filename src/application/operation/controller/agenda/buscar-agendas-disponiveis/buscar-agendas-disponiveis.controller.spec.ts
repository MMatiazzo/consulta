import { Test, TestingModule } from '@nestjs/testing';
import { BuscarAgendasDisponiveisController } from './buscar-agendas-disponiveis.controller';
import { BuscarAgendasDisponiveisUseCase } from '../../../../../core/agenda/usecase/buscar-agendas-disponiveis/buscar-agendas-disponiveis.usecase';
import { Agenda } from '../../../../../core/agenda/entity/agenda.entity';
import { BuscarAgendasDisponiveisDto } from '../../../../../core/agenda/dto/buscar-agendas-disponiveis.dto';

describe('BuscarAgendasDisponiveisController', () => {
  let controller: BuscarAgendasDisponiveisController;
  let useCaseMock: BuscarAgendasDisponiveisUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuscarAgendasDisponiveisController],
      providers: [
        {
          provide: BuscarAgendasDisponiveisUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<BuscarAgendasDisponiveisController>(BuscarAgendasDisponiveisController);
    useCaseMock = module.get<BuscarAgendasDisponiveisUseCase>(BuscarAgendasDisponiveisUseCase);
  });

  describe('handle', () => {
    it('Deve ser possível retornar agendas disponiveis do usecase', async () => {
      const crm = '123456789';
      const dto: BuscarAgendasDisponiveisDto = { crm };

      const expectedAgendas: Agenda[] = [
        { crm_medico: crm, data_horario: new Date(), ocupado: false },
        { crm_medico: crm, data_horario: new Date(), ocupado: false },
      ];

      (useCaseMock.execute as jest.Mock).mockResolvedValue(expectedAgendas);

      const result = await controller.handle(dto);

      expect(result).toEqual(expectedAgendas);
      expect(useCaseMock.execute).toHaveBeenCalledWith(dto);
    });
  });
});
