import { Test, TestingModule } from '@nestjs/testing';
import { CadastrarAgendaUseCase } from './cadastrar-agenda.usecase';
import { CadastrarAgendaDto } from '../../dto/cadastrar-agenda.dto';
import { Agenda } from '../../entity/agenda.entity';
import { IAgendaGateway } from '../../../../application/operation/gateway/agenda/Iagenda.gateway';

describe('CadastrarAgendaUseCase', () => {
  let useCase: CadastrarAgendaUseCase;
  let agendaGateway: IAgendaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CadastrarAgendaUseCase,
        {
          provide: IAgendaGateway,
          useFactory: () => ({
            cadastrarAgenda: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<CadastrarAgendaUseCase>(CadastrarAgendaUseCase);
    agendaGateway = module.get<IAgendaGateway>(IAgendaGateway);
  });

  describe('execute', () => {
    it('Deve ser possível invocar cadastrarAgenda no agendaGateway com o payload correto', async () => {
      const dto: CadastrarAgendaDto = {
        crm: '123456',
        horario: new Date(),
      };

      const novaAgenda: Agenda = {
        crm_medico: dto.crm,
        data_horario: dto.horario,
        ocupado: false,
      };

      (agendaGateway.cadastrarAgenda as jest.Mock).mockResolvedValue(novaAgenda);

      const result = await useCase.execute(dto);

      expect(result).toEqual(novaAgenda);
      expect(agendaGateway.cadastrarAgenda).toHaveBeenCalledWith(expect.objectContaining(novaAgenda));
    });
  });
});
