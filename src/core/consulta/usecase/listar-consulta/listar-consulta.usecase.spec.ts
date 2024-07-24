import { Test, TestingModule } from '@nestjs/testing';
import { ListarConsultaUseCase } from './listar-consulta.usecase';
import { Consulta } from '../../entity/consulta.entity';
import { IConsultaGateway } from '../../../../application/operation/gateway/consulta/Iconsulta.gateway';

describe('ListarConsultaUseCase', () => {
  let useCase: ListarConsultaUseCase;
  let consultaGateway: IConsultaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListarConsultaUseCase,
        {
          provide: IConsultaGateway,
          useFactory: () => ({
            listarConsultas: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<ListarConsultaUseCase>(ListarConsultaUseCase);
    consultaGateway = module.get<IConsultaGateway>(IConsultaGateway);
  });

  describe('execute', () => {
    it('Deve ser possível listar consultas com crm ou cpf', async () => {
      const crmOrCpf = '123456789';

      const consultas: Consulta[] = [
        {
          id_agenda: 'agenda_id_1',
          crm_medico: '123456',
          cpf_paciente: '789012',
          status: 'solicitada',
        },
        {
          id_agenda: 'agenda_id_2',
          crm_medico: '123456',
          cpf_paciente: '456789',
          status: 'aceita',
        },
      ];
      (consultaGateway.listarConsultas as jest.Mock).mockResolvedValue(consultas);

      const result = await useCase.execute(crmOrCpf);

      expect(result).toEqual(consultas);
      expect(consultaGateway.listarConsultas).toHaveBeenCalledWith(crmOrCpf);
    });

    it('Deve ser possível retornar um array vazio caso não encontrar consultas com cpf ou crm', async () => {
      const crmOrCpf = 'non_existing_crm_or_cpf';

      (consultaGateway.listarConsultas as jest.Mock).mockResolvedValue([]);

      const result = await useCase.execute(crmOrCpf);

      expect(result).toEqual([]);
      expect(consultaGateway.listarConsultas).toHaveBeenCalledWith(crmOrCpf);
    });
  });
});
