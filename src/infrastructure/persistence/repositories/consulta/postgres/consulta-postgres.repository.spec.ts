import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaPostgresRepository } from './consulta-postgres.repository';
import { PrismaService } from '../../../../../infrastructure/persistence/prisma/prisma.service';
import { Consulta } from '../../../../../core/consulta/entity/consulta.entity';

describe('ConsultaPostgresRepository', () => {
  let repository: ConsultaPostgresRepository;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultaPostgresRepository,
        {
          provide: PrismaService,
          useFactory: () => ({
            consulta: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            $connect: jest.fn(),
            $disconnect: jest.fn(),
          }),
        },
      ],
    }).compile();

    repository = module.get<ConsultaPostgresRepository>(ConsultaPostgresRepository);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  describe('criar', () => {
    it('Deve ser possível criar uma nova consulta', async () => {
      const consulta: Consulta = {
        id_agenda: 'agenda_id',
        crm_medico: '123456',
        cpf_paciente: '12345678900',
        status: 'solicitada',
      };

      const createdConsulta: Consulta = {
        crm_medico: consulta.crm_medico,
        cpf_paciente: consulta.cpf_paciente,
        status: consulta.status,
        id_agenda: consulta.id_agenda
      };

      (prismaServiceMock.consulta.create as jest.Mock).mockResolvedValue(createdConsulta);

      const result = await repository.criar(consulta);

      expect(result).toEqual(createdConsulta);
      expect(prismaServiceMock.consulta.create).toHaveBeenCalledWith({ data: consulta });
    });
  });

  describe('listar', () => {
    it('Deve ser possível listar consulta com crm ou cpf', async () => {
      const crmOrCpf = '123456';

      const expectedConsultas: Consulta[] = [
        {
          crm_medico: crmOrCpf,
          cpf_paciente: '12345678900',
          status: 'solicitada',
          id_agenda: 'agenda_id',
        },
        {
          crm_medico: '789012',
          cpf_paciente: crmOrCpf,
          status: 'aceita',
          id_agenda: 'agenda_id',
        },
      ];

      (prismaServiceMock.consulta.findMany as jest.Mock).mockResolvedValue(expectedConsultas);

      const result = await repository.listar(crmOrCpf);

      expect(result).toEqual(expectedConsultas);
      expect(prismaServiceMock.consulta.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { crm_medico: crmOrCpf },
            { cpf_paciente: crmOrCpf },
          ],
        },
      });
    });
  });

  describe('buscarPorId', () => {
    it('Deve ser possível buscar uma consulta por id', async () => {
      const consultaId = '1';
      const expectedConsulta: Consulta = {
        crm_medico: '123456',
        cpf_paciente: '12345678900',
        status: 'solicitada',
        id_agenda: 'agenda_id',
      };

      (prismaServiceMock.consulta.findUnique as jest.Mock).mockResolvedValue(expectedConsulta);

      const result = await repository.buscarPorId(consultaId);

      expect(result).toEqual(expectedConsulta);
      expect(prismaServiceMock.consulta.findUnique).toHaveBeenCalledWith({
        where: { id: consultaId },
      });
    });

    it('Não deve ser possível retornar uma consulta que não existe', async () => {
      const consultaId = 'non_existing_id';

      (prismaServiceMock.consulta.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.buscarPorId(consultaId);

      expect(result).toEqual(null);
      expect(prismaServiceMock.consulta.findUnique).toHaveBeenCalledWith({
        where: { id: consultaId },
      });
    });
  });

  describe('atualiza', () => {
    it('Deve ser possível atualizar o status de uma consulta', async () => {
      const consultaId = '1';
      const status = 'aceita';

      const updatedConsulta: Consulta = {
        crm_medico: '123456',
        cpf_paciente: '12345678900',
        status,
        id_agenda: 'agenda_id',
      };

      (prismaServiceMock.consulta.update as jest.Mock).mockResolvedValue(updatedConsulta);

      const result = await repository.atualiza(consultaId, status);

      expect(result).toEqual(updatedConsulta);
      expect(prismaServiceMock.consulta.update).toHaveBeenCalledWith({
        where: { id: consultaId },
        data: { status },
      });
    });
  });
});
