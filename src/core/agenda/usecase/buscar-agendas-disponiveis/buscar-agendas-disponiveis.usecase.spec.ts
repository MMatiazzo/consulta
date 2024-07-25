import { Test, TestingModule } from '@nestjs/testing';
import { BuscarAgendasDisponiveisUseCase } from './buscar-agendas-disponiveis.usecase';
import { BuscarAgendasDisponiveisDto } from '../../dto/buscar-agendas-disponiveis.dto';
import { Agenda } from '../../entity/agenda.entity';
import { IAgendaGateway } from '../../../../application/operation/gateway/agenda/Iagenda.gateway';

describe('BuscarAgendasDisponiveisUseCase', () => {
  let useCase: BuscarAgendasDisponiveisUseCase;
  let agendaGateway: IAgendaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuscarAgendasDisponiveisUseCase,
        {
          provide: IAgendaGateway,
          useFactory: () => ({
            buscarAgendasDisponiveis: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<BuscarAgendasDisponiveisUseCase>(BuscarAgendasDisponiveisUseCase);
    agendaGateway = module.get<IAgendaGateway>(IAgendaGateway);
  });

  describe('execute', () => {
    it('De ser possível chamar buscarAgendasDisponiveis no agendaGateway com parâmetros corretos', async () => {
      const crm = 'teste';
      const mockAgendas: Agenda[] = [{
        crm_medico: crm,
        data_horario: new Date(),
        ocupado: false
      }];

      (agendaGateway.buscarAgendasDisponiveis as jest.Mock).mockResolvedValue(mockAgendas);

      const dto: BuscarAgendasDisponiveisDto = { crm };

      const result = await useCase.execute(dto);

      expect(result).toEqual(mockAgendas);
      expect(agendaGateway.buscarAgendasDisponiveis).toHaveBeenCalledWith(crm);
    });

    it('Deve ser possível retornar agenda com crm inválido', async () => {
      (agendaGateway.buscarAgendasDisponiveis as jest.Mock).mockResolvedValue([]);

      const dto: BuscarAgendasDisponiveisDto = {};

      const result = await useCase.execute(dto);

      expect(result).toEqual([]);
      expect(agendaGateway.buscarAgendasDisponiveis).toHaveBeenCalledWith(null);
    });
  });
});
