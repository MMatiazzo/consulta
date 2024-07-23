import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

import { CadastrarAgendaUseCase } from 'src/core/agenda/usecase/cadastrar-agenda/cadastrar-agenda.usecase';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import { IAgendaRepository } from 'src/infrastructure/persistence/repositories/agenda/Iagenda.repository';
import { AgendaPostgresRepository } from 'src/infrastructure/persistence/repositories/agenda/postgres/agenda-postgres.repository';
import { AgendaControllerRoute } from '../api/http-rest/routes/agenda.routes';
import { CadastrarAgendaController } from '../operation/controller/agenda/cadastrar-agenda/cadastrar-agenda.controller';
import { IAgendaGateway } from '../operation/gateway/agenda/Iagenda.gateway';
import { AgendaGateway } from '../operation/gateway/agenda/agenda.gateway';
import { BuscarAgendasDisponiveisController } from '../operation/controller/agenda/buscar-agendas-disponiveis/buscar-agendas-disponiveis.controller';
import { BuscarAgendasDisponiveisUseCase } from 'src/core/agenda/usecase/buscar-agendas-disponiveis/buscar-agendas-disponiveis.usecase';
import { DeletarAgendaUseCase } from 'src/core/agenda/usecase/deletar-agenda/deletar-agenda.usecase';
import { DeletarAgendaController } from '../operation/controller/agenda/deletar-agenda/deletar-agenda.controller';

const persistenceProviders: Provider[] = [
  PrismaService,
  {
    provide: IAgendaRepository,
    useFactory: (prisma: PrismaService) =>
      new AgendaPostgresRepository(prisma),
    inject: [PrismaService],
  },
  {
    provide: IAgendaGateway,
    useFactory: (agendaRepository: IAgendaRepository) =>
      new AgendaGateway(agendaRepository),
    inject: [IAgendaRepository],
  }
];

const useCaseProviders: Provider[] = [
  {
    provide: CadastrarAgendaUseCase,
    useFactory: (agendaGateway: IAgendaGateway) =>
      new CadastrarAgendaUseCase(agendaGateway),
    inject: [IAgendaGateway],
  },
  {
    provide: BuscarAgendasDisponiveisUseCase,
    useFactory: (agendaGateway: IAgendaGateway) =>
      new BuscarAgendasDisponiveisUseCase(agendaGateway),
    inject: [IAgendaGateway],
  },
  {
    provide: DeletarAgendaUseCase,
    useFactory: (agendaGateway: IAgendaGateway) =>
      new DeletarAgendaUseCase(agendaGateway),
    inject: [IAgendaGateway],
  }
];

const controllerProviders: Provider[] = [
  {
    provide: CadastrarAgendaController,
    useFactory: (cadastrarAgendaUseCase: CadastrarAgendaUseCase) =>
      new CadastrarAgendaController(cadastrarAgendaUseCase),
    inject: [CadastrarAgendaUseCase],
  },
  {
    provide: BuscarAgendasDisponiveisController,
    useFactory: (buscarAgendasDisponiveisUseCase: BuscarAgendasDisponiveisUseCase) =>
      new BuscarAgendasDisponiveisController(buscarAgendasDisponiveisUseCase),
    inject: [BuscarAgendasDisponiveisUseCase],
  },
  {
    provide: DeletarAgendaController,
    useFactory: (deletarAgendaUseCase: DeletarAgendaUseCase) =>
      new DeletarAgendaController(deletarAgendaUseCase),
    inject: [DeletarAgendaUseCase],
  }
];

@Module({
  imports: [],
  controllers: [AgendaControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class AgendaModule { }
