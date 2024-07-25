import { Test, TestingModule } from '@nestjs/testing';
import { AtualizarConsultaController } from './atualizar-consulta.controller';
import { AtualizarConsultaUseCase } from '../../../../../core/consulta/usecase/atualizar-consulta/atualizar-consulta.usecase';
import { Consulta } from '../../../../../core/consulta/entity/consulta.entity';
import { AtualizarConsultaDto } from '../../../../../core/consulta/dto/atualizar-consulta.dto';
import { BadRequestException } from '@nestjs/common';

describe('AtualizarConsultaController', () => {
  let controller: AtualizarConsultaController;
  let useCaseMock: AtualizarConsultaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtualizarConsultaController],
      providers: [
        {
          provide: AtualizarConsultaUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<AtualizarConsultaController>(AtualizarConsultaController);
    useCaseMock = module.get<AtualizarConsultaUseCase>(AtualizarConsultaUseCase);
  });

  describe('handle', () => {
    it('Deve ser possível atualizar uma consulta passando pelo use case com o parâmetros corretos', async () => {
      const consultaId = '123456789';
      const payload: AtualizarConsultaDto = {
        status: 'aceita',
      };

      const expectedConsulta: Consulta = {
        id_agenda: 'agendaId',
        crm_medico: 'crm_medico',
        cpf_paciente: 'cpf_paciente',
        status: 'aceita',
      };

      (useCaseMock.execute as jest.Mock).mockResolvedValue(expectedConsulta);

      const result = await controller.handle(consultaId, payload);

      expect(result).toEqual(expectedConsulta);
      expect(useCaseMock.execute).toHaveBeenCalledWith(consultaId, payload);
    });

    it('Deve ser possível receber um BadRequestException se o status for inválido', async () => {
      const consultaId = '123456789';
      const payload: AtualizarConsultaDto = {
        status: 'invalid_status',
      };

      (useCaseMock.execute as jest.Mock).mockRejectedValue(new BadRequestException('Status inválido'));

      await expect(controller.handle(consultaId, payload)).rejects.toThrow(BadRequestException);
      expect(useCaseMock.execute).toHaveBeenCalledWith(consultaId, payload);
    });
  });
});
