import { Test } from '@nestjs/testing';
import { BuscarAgendasDisponiveisController } from '../../../../application/operation/controller/agenda/buscar-agendas-disponiveis/buscar-agendas-disponiveis.controller';
import { CadastrarAgendaController } from '../../../../application/operation/controller/agenda/cadastrar-agenda/cadastrar-agenda.controller';
import { DeletarAgendaController } from '../../../../application/operation/controller/agenda/deletar-agenda/deletar-agenda.controller';
import { BuscarAgendasDisponiveisDto } from '../../../../core/agenda/dto/buscar-agendas-disponiveis.dto';
import { CadastrarAgendaDto } from '../../../../core/agenda/dto/cadastrar-agenda.dto';
import { DeletarAgendaDto } from '../../../../core/agenda/dto/deletar-agenda.dto';
import { Agenda } from '../../../../core/agenda/entity/agenda.entity';
import { AgendaControllerRoute } from './agenda.routes';

describe('AgendaControllerRoute', () => {
  let agendaController: AgendaControllerRoute;
  let cadastrarAgendaController: CadastrarAgendaController;
  let buscarAgendasDisponiveisController: BuscarAgendasDisponiveisController;
  let deletarAgendaController: DeletarAgendaController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        AgendaControllerRoute,
      ],
      providers: [
        {
          provide: CadastrarAgendaController,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: BuscarAgendasDisponiveisController,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: DeletarAgendaController,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    agendaController = moduleRef.get<AgendaControllerRoute>(AgendaControllerRoute);
    cadastrarAgendaController = moduleRef.get<CadastrarAgendaController>(CadastrarAgendaController);
    buscarAgendasDisponiveisController = moduleRef.get<BuscarAgendasDisponiveisController>(BuscarAgendasDisponiveisController);
    deletarAgendaController = moduleRef.get<DeletarAgendaController>(DeletarAgendaController);
  });

  describe('POST /agenda/cadastrar', () => {
    it('Deve ser possível criar uma agenda', async () => {
      const payload: CadastrarAgendaDto = {
        crm: "12345",
        horario: new Date()
      };

      const mockAgenda: Agenda = {
        crm_medico: "12345",
        data_horario: new Date(),
        ocupado: false
      }

      jest.spyOn(cadastrarAgendaController, 'handle').mockResolvedValue(mockAgenda);

      const result = await agendaController.cadastrar(payload);
      expect(result).toEqual(mockAgenda);
    });
  });

  describe('GET /agenda/buscar', () => {
    it('Deve ser possível retornar agendas disponíveis', async () => {
      const payload: BuscarAgendasDisponiveisDto = {
        crm: "12345"
      };

      const mockAgenda: Agenda[] = [{
        crm_medico: "12345",
        data_horario: new Date(),
        ocupado: false
      }]

      jest.spyOn(buscarAgendasDisponiveisController, 'handle').mockResolvedValue(mockAgenda);

      const result = await agendaController.buscar(payload);
      expect(result).toEqual(mockAgenda);
    });
  });

  describe('DELETE /agenda/deletar/:agendaId', () => {
    it('Deve ser possível deletar uma agenda', async () => {
      const payload: DeletarAgendaDto = {
        agendaId: 'test-id',
      };

      await expect(agendaController.deletar(payload)).resolves.not.toThrow();
    });
  });
});
