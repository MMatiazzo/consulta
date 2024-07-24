import { Test, TestingModule } from '@nestjs/testing';
import { ListarConsultaController } from './listar-consulta.controller';
import { ListarConsultaUseCase } from '../../../../../core/consulta/usecase/listar-consulta/listar-consulta.usecase';
import { Consulta } from '../../../../../core/consulta/entity/consulta.entity';

describe('ListarConsultaController', () => {
  let controller: ListarConsultaController;
  let useCaseMock: ListarConsultaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListarConsultaController],
      providers: [
        {
          provide: ListarConsultaUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<ListarConsultaController>(ListarConsultaController);
    useCaseMock = module.get<ListarConsultaUseCase>(ListarConsultaUseCase);
  });

  describe('handle', () => {
    it('Deve ser possível listar as consultas passando pelo usecase com os parâmetros corretos', async () => {
      const payload: string = 'crmOrCpf';

      const expectedConsultas: Consulta[] = [
        { id_agenda: 'agendaId1', crm_medico: 'crm_medico', cpf_paciente: 'cpf_paciente', status: 'solicitada' },
        { id_agenda: 'agendaId2', crm_medico: 'crm_medico', cpf_paciente: 'cpf_paciente', status: 'aceita' },
      ];

      (useCaseMock.execute as jest.Mock).mockResolvedValue(expectedConsultas);

      const result = await controller.handle(payload);

      expect(result).toEqual(expectedConsultas);
      expect(useCaseMock.execute).toHaveBeenCalledWith(payload);
    });

  });
});
