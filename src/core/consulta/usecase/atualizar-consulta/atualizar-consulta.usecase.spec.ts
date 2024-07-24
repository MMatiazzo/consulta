import { Test, TestingModule } from '@nestjs/testing';
import { AtualizarConsultaUseCase } from './atualizar-consulta.usecase';
import { AtualizarConsultaDto } from '../../dto/atualizar-consulta.dto';
import { Consulta, CONSULTA_STATUS } from '../../entity/consulta.entity';
import { BadRequestException } from '@nestjs/common';
import { IConsultaGateway } from '../../../../application/operation/gateway/consulta/Iconsulta.gateway';
import { IAgendaGateway } from '../../../../application/operation/gateway/agenda/Iagenda.gateway';

describe('AtualizarConsultaUseCase', () => {
  let useCase: AtualizarConsultaUseCase;
  let consultaGateway: IConsultaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtualizarConsultaUseCase,
        {
          provide: IConsultaGateway,
          useFactory: () => ({
            buscarConsultaPorId: jest.fn(),
            atualizaConsulta: jest.fn(),
          }),
        },
        {
          provide: IAgendaGateway,
          useFactory: () => ({
            atualizarAgenda: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<AtualizarConsultaUseCase>(AtualizarConsultaUseCase);
    consultaGateway = module.get<IConsultaGateway>(IConsultaGateway);
  });

  describe('execute', () => {
    it('Não deve ser possível atualizar uma consulta com status inválido', async () => {
      const consultaId = 'some_id';
      const payload: AtualizarConsultaDto = {
        status: 'invalid_status', 
      };

      await expect(useCase.execute(consultaId, payload)).rejects.toThrow(BadRequestException);
      expect(consultaGateway.buscarConsultaPorId).not.toHaveBeenCalled();
      expect(consultaGateway.atualizaConsulta).not.toHaveBeenCalled();
    });

    it('Não deve ser possível atualizar uma consulta que não existe', async () => {
      const consultaId = 'non_existing_id';
      const payload: AtualizarConsultaDto = {
        status: CONSULTA_STATUS.ACEITA,
      };

      (consultaGateway.buscarConsultaPorId as jest.Mock).mockResolvedValue(undefined);

      await expect(useCase.execute(consultaId, payload)).rejects.toThrow(BadRequestException);
      expect(consultaGateway.buscarConsultaPorId).toHaveBeenCalledWith(consultaId);
      expect(consultaGateway.atualizaConsulta).not.toHaveBeenCalled();
    });

    it('Deve ser possível atualizar uma consulta', async () => {
      const consultaId = 'existing_id';
      const payload: AtualizarConsultaDto = {
        status: CONSULTA_STATUS.ACEITA,
      };

      const consulta: Consulta = {
        id_agenda: 'agenda_id',
        crm_medico: '123456',
        cpf_paciente: '789012',
        status: CONSULTA_STATUS.SOLICITADA,
      };
      (consultaGateway.buscarConsultaPorId as jest.Mock).mockResolvedValue(consulta);

      const updatedConsulta: Consulta = {
        ...consulta,
        status: payload.status,
      };
      (consultaGateway.atualizaConsulta as jest.Mock).mockResolvedValue(updatedConsulta);

      const result = await useCase.execute(consultaId, payload);

      expect(result).toEqual(updatedConsulta);
      expect(consultaGateway.buscarConsultaPorId).toHaveBeenCalledWith(consultaId);
      expect(consultaGateway.atualizaConsulta).toHaveBeenCalledWith(consultaId, payload.status);
    });
  });
});
