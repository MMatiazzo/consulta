import { Test, TestingModule } from '@nestjs/testing';
import { DeletarAgendaUseCase } from './deletar-agenda.usecase';
import { IAgendaGateway } from '../../../../application/operation/gateway/agenda/Iagenda.gateway';
import { DeletarAgendaDto } from '../../dto/deletar-agenda.dto';
import { Agenda } from '../../entity/agenda.entity';
import { BadRequestException } from '@nestjs/common';

describe('DeletarAgendaUseCase', () => {
  let useCase: DeletarAgendaUseCase;
  let agendaGateway: IAgendaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletarAgendaUseCase,
        {
          provide: IAgendaGateway,
          useFactory: () => ({
            buscarAgendaPorId: jest.fn(),
            deletarAgenda: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<DeletarAgendaUseCase>(DeletarAgendaUseCase);
    agendaGateway = module.get<IAgendaGateway>(IAgendaGateway);
  });

  describe('execute', () => {
    it('Não deve ser possível deletar uma agenda que não existe', async () => {
      const dto: DeletarAgendaDto = {
      agendaId: 'some_id',
    };

    (agendaGateway.buscarAgendaPorId as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
    expect(agendaGateway.buscarAgendaPorId).toHaveBeenCalledWith(dto.agendaId);
  });

  it('Não deve ser possível deletar uma agenda com status ocupada', async () => {
    const dto: DeletarAgendaDto = {
      agendaId: 'some_id',
    };

    const agenda: Agenda = {
      crm_medico: '123456',
      data_horario: new Date(),
      ocupado: true,
    };
    (agendaGateway.buscarAgendaPorId as jest.Mock).mockResolvedValue(agenda);

    await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
    expect(agendaGateway.buscarAgendaPorId).toHaveBeenCalledWith(dto.agendaId);
  });

  it('Deve ser possível deletar uma agenda', async () => {
    const dto: DeletarAgendaDto = {
      agendaId: 'some_id',
    };

    const agenda: Agenda = {
      crm_medico: '123456',
      data_horario: new Date(),
      ocupado: false,
    };
    (agendaGateway.buscarAgendaPorId as jest.Mock).mockResolvedValue(agenda);

    await useCase.execute(dto);
    expect(agendaGateway.buscarAgendaPorId).toHaveBeenCalledWith(dto.agendaId);
    expect(agendaGateway.deletarAgenda).toHaveBeenCalledWith(dto.agendaId);
  });
});
});
