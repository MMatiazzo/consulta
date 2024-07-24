import { Test, TestingModule } from '@nestjs/testing';
import { AgendaPostgresRepository } from './agenda-postgres.repository';
import { PrismaService } from '../../../../../infrastructure/persistence/prisma/prisma.service';
import { Agenda } from '../../../../../core/agenda/entity/agenda.entity';

describe('AgendaPostgresRepository', () => {
  let repository: AgendaPostgresRepository;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaPostgresRepository,
        {
          provide: PrismaService,
          useFactory: () => ({
            agenda: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
            $connect: jest.fn(),
            $disconnect: jest.fn(),
          }),
        },
      ],
    }).compile();

    repository = module.get<AgendaPostgresRepository>(AgendaPostgresRepository);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  describe('criar', () => {
    it('Deve ser possível criar uma nova agenda', async () => {
      const agenda: Agenda = {
        crm_medico: '123456',
        data_horario: new Date(),
        ocupado: false,
      };

      const createdAgenda: Agenda = {
        crm_medico: agenda.crm_medico,
        data_horario: agenda.data_horario,
        ocupado: agenda.ocupado,
      };

      (prismaServiceMock.agenda.create as jest.Mock).mockResolvedValue(createdAgenda);

      const result = await repository.criar(agenda);

      expect(result).toEqual(createdAgenda);
      expect(prismaServiceMock.agenda.create).toHaveBeenCalledWith({ data: agenda });
    });
  });

  describe('buscar', () => {
    it('Deve ser possível buscar uma agenda com crm', async () => {
      const crm = '123456';

      const expectedAgendas: Agenda[] = [
        {
          crm_medico: crm,
          data_horario: new Date(),
          ocupado: false,
        },
        {
          crm_medico: crm,
          data_horario: new Date(),
          ocupado: false,
        },
      ];

      (prismaServiceMock.agenda.findMany as jest.Mock).mockResolvedValue(expectedAgendas);

      const result = await repository.buscar(crm);

      expect(result).toEqual(expectedAgendas);
      expect(prismaServiceMock.agenda.findMany).toHaveBeenCalledWith({
        where: {
          crm_medico: crm,
          ocupado: false,
        },
      });
    });

    it('Deve ser possível buscar todas as agendas', async () => {
      const expectedAgendas: Agenda[] = [
        {
          crm_medico: '123456',
          data_horario: new Date(),
          ocupado: false,
        },
        {
          crm_medico: '789012',
          data_horario: new Date(),
          ocupado: false,
        },
      ];

      (prismaServiceMock.agenda.findMany as jest.Mock).mockResolvedValue(expectedAgendas);

      const result = await repository.buscar(null);

      expect(result).toEqual(expectedAgendas);
      expect(prismaServiceMock.agenda.findMany).toHaveBeenCalledWith({
        where: {
          ocupado: false,
        },
      });
    });
  });

  describe('buscarPorId', () => {
    it('Deve ser possível buscar uma agenda por id', async () => {
      const id = '1';
      const expectedAgenda: Agenda = {
        crm_medico: '123456',
        data_horario: new Date(),
        ocupado: false,
      };

      (prismaServiceMock.agenda.findUnique as jest.Mock).mockResolvedValue(expectedAgenda);

      const result = await repository.buscarPorId(id);

      expect(result).toEqual(expectedAgenda);
      expect(prismaServiceMock.agenda.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('Não deve deve ser possível returnar uma agenda que não existe', async () => {
      const id = 'non_existing_id';

      (prismaServiceMock.agenda.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.buscarPorId(id);

      expect(result).toBeNull();
      expect(prismaServiceMock.agenda.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('deletar', () => {
    it('Deve ser possível deletar uma agenda por id', async () => {
      const id = '1';

      await repository.deletar(id);

      expect(prismaServiceMock.agenda.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
