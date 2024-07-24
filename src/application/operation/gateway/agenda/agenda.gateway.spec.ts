import { Test, TestingModule } from '@nestjs/testing';
import { AgendaGateway } from './agenda.gateway';
import { IAgendaRepository } from '../../../../infrastructure/persistence/repositories/agenda/Iagenda.repository';
import { Agenda } from '../../../../core/agenda/entity/agenda.entity';

describe('AgendaGateway', () => {
  let gateway: AgendaGateway;
  let repositoryMock: IAgendaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaGateway,
        {
          provide: IAgendaRepository,
          useFactory: () => ({
            criar: jest.fn(),
            buscar: jest.fn(),
            buscarPorId: jest.fn(),
            deletar: jest.fn(),
          }),
        },
      ],
    }).compile();

    gateway = module.get<AgendaGateway>(AgendaGateway);
    repositoryMock = module.get<IAgendaRepository>(IAgendaRepository);
  });

  describe('cadastrarAgenda', () => {
    it('Deve ser possível chamar a função criar do repository com os parâmetros corretos', async () => {
      const agenda: Agenda = {
        crm_medico: 'crm_medico',
        data_horario: new Date(),
        ocupado: false,
      };

      const expectedAgenda: Agenda = { ...agenda };

      (repositoryMock.criar as jest.Mock).mockResolvedValue(expectedAgenda);

      const result = await gateway.cadastrarAgenda(agenda);

      expect(result).toEqual(expectedAgenda);
      expect(repositoryMock.criar).toHaveBeenCalledWith(agenda);
    });
  });

  describe('buscarAgendasDisponiveis', () => {
    it('Deve ser possível chamar a função buscar do repository com os parâmetros corretos', async () => {
      const crm: string = 'crm_medico';
      const expectedAgendas: Agenda[] = [
        { crm_medico: crm, data_horario: new Date(), ocupado: false },
        { crm_medico: crm, data_horario: new Date(), ocupado: true },
      ];

      (repositoryMock.buscar as jest.Mock).mockResolvedValue(expectedAgendas);

      const result = await gateway.buscarAgendasDisponiveis(crm);

      expect(result).toEqual(expectedAgendas);
      expect(repositoryMock.buscar).toHaveBeenCalledWith(crm);
    });
  });

});
