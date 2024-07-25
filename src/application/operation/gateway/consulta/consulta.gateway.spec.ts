import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaGateway } from './consulta.gateway';
import { IConsultaRepository } from '../../../../infrastructure/persistence/repositories/consulta/Iconsulta.repository';
import { Consulta } from '../../../../core/consulta/entity/consulta.entity';

describe('ConsultaGateway', () => {
  let gateway: ConsultaGateway;
  let repositoryMock: IConsultaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultaGateway,
        {
          provide: IConsultaRepository,
          useFactory: () => ({
            criar: jest.fn(),
            listar: jest.fn(),
            buscarPorId: jest.fn(),
            atualiza: jest.fn(),
          }),
        },
      ],
    }).compile();

    gateway = module.get<ConsultaGateway>(ConsultaGateway);
    repositoryMock = module.get<IConsultaRepository>(IConsultaRepository);
  });

  describe('cadastrarConsulta', () => {
    it('Deve ser possível chamar a função criar do repository com os parâmetros corretos', async () => {
      const consulta: Consulta = {
        id_agenda: 'agendaId',
        crm_medico: 'crm_medico',
        cpf_paciente: 'cpf_paciente',
        status: 'solicitada',
      };

      const expectedConsulta: Consulta = { ...consulta };

      (repositoryMock.criar as jest.Mock).mockResolvedValue(expectedConsulta);

      const result = await gateway.cadastrarConsulta(consulta);

      expect(result).toEqual(expectedConsulta);
      expect(repositoryMock.criar).toHaveBeenCalledWith(consulta);
    });
  });

  describe('listarConsultas', () => {
    it('Deve ser possível chamar a função listar do repository com os parâmetros corretos', async () => {
      const crmOrCpf: string = 'crmOrCpf';
      const expectedConsultas: Consulta[] = [
        { id_agenda: 'agendaId1', crm_medico: 'crm_medico', cpf_paciente: 'cpf_paciente', status: 'solicitada' },
        { id_agenda: 'agendaId2', crm_medico: 'crm_medico', cpf_paciente: 'cpf_paciente', status: 'aceita' },
      ];

      (repositoryMock.listar as jest.Mock).mockResolvedValue(expectedConsultas);

      const result = await gateway.listarConsultas(crmOrCpf);

      expect(result).toEqual(expectedConsultas);
      expect(repositoryMock.listar).toHaveBeenCalledWith(crmOrCpf);
    });
  });

});
