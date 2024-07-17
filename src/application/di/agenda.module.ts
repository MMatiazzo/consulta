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
  }
];

const controllerProviders: Provider[] = [
  {
    provide: CadastrarAgendaController,
    useFactory: (cadastrarAgendaUseCase: CadastrarAgendaUseCase) =>
      new CadastrarAgendaController(cadastrarAgendaUseCase),
    inject: [CadastrarAgendaUseCase],
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
