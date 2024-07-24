import { Test } from '@nestjs/testing';
import { CadastrarConsultaDto } from '../../../../core/consulta/dto/cadastrar-consulta.dto';
import { ListarConsultasDto } from '../../../../core/consulta/dto/listar-consulta.dto';
import { AtualizarConsultaDto } from '../../../../core/consulta/dto/atualizar-consulta.dto';
import { Consulta } from '../../../../core/consulta/entity/consulta.entity';
import { ConsultaControllerRoute } from './consulta.routes';
import { CadastrarConsultaController } from '../../../../application/operation/controller/consulta/criar-consulta/cadastrar-consulta.controller';
import { ListarConsultaController } from '../../../../application/operation/controller/consulta/listar-consulta/listar-consulta.controller';
import { AtualizarConsultaController } from '../../../../application/operation/controller/consulta/atualizar-consulta/atualizar-consulta.controller';

describe('ConsultaControllerRoute', () => {
  let consultaController: ConsultaControllerRoute;
  let cadastrarConsultaController: CadastrarConsultaController;
  let listarConsultaController: ListarConsultaController;
  let atualizarConsultaController: AtualizarConsultaController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        ConsultaControllerRoute,
      ],
      providers: [
        {
          provide: CadastrarConsultaController,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: ListarConsultaController,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: AtualizarConsultaController,
          useValue: {
            handle: jest.fn(),
          },
        },
      ]
    }).compile();

    consultaController = moduleRef.get<ConsultaControllerRoute>(ConsultaControllerRoute);
    cadastrarConsultaController = moduleRef.get<CadastrarConsultaController>(CadastrarConsultaController);
    listarConsultaController = moduleRef.get<ListarConsultaController>(ListarConsultaController);
    atualizarConsultaController = moduleRef.get<AtualizarConsultaController>(AtualizarConsultaController);
  });

  describe('POST /consulta/cadastrar', () => {
    it('Deve ser possível criar uma consulta', async () => {
      const payload: CadastrarConsultaDto = {
        cpf_paciente: "12345",
        crm_medico: "23456",
        id_agenda: "agenda_id",
        status: 'aceita'
      };

      const mockConsulta: Consulta = {
        cpf_paciente: '12345',
        crm_medico: '23456',
        id_agenda: "agenda_id",
        status: "aceita"
      }

      jest.spyOn(cadastrarConsultaController, 'handle').mockResolvedValue(mockConsulta);

      const result = await consultaController.cadastrar(payload);
      expect(result).toEqual(mockConsulta);
    });
  });

  describe('GET /consulta/listar', () => {
    it('Deve ser possível listar consultas', async () => {
      const payload: ListarConsultasDto = {
        crmOrCpf: "23456"
      };

      const mockConsulta: Consulta[] = [{
        cpf_paciente: '12345',
        crm_medico: '23456',
        id_agenda: "agenda_id",
        status: "aceita"
      }]

      jest.spyOn(listarConsultaController, 'handle').mockResolvedValue(mockConsulta);

      const result = await consultaController.listar(payload);
      expect(result).toEqual(mockConsulta);
    });
  });

  describe('PUT /consulta/atualizar/:consultaId', () => {
    it('Deve ser possível atualizar uma consulta', async () => {
      const consultaId = 'test-id';
      const payload: AtualizarConsultaDto = {
        status: "aceita"
      };

      const mockConsulta: Consulta = {
        cpf_paciente: '12345',
        crm_medico: '23456',
        id_agenda: "agenda_id",
        status: "aceita"
      }

      jest.spyOn(atualizarConsultaController, 'handle').mockResolvedValue(mockConsulta);

      const result = await consultaController.atualizar({ consultaId }, payload);
      expect(result).toEqual(mockConsulta);
    });
  });
});
