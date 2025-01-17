import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CadastrarConsultaUseCase } from 'src/core/consulta/usecase/cadastrar-consulta/cadastrar-consulta.usecase';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import { IConsultaRepository } from 'src/infrastructure/persistence/repositories/consulta/Iconsulta.repository';
import { ConsultaPostgresRepository } from 'src/infrastructure/persistence/repositories/consulta/postgres/consulta-postgres.repository';
import { ConsultaControllerRoute } from '../api/http-rest/routes/consulta.routes';
import { CadastrarConsultaController } from '../operation/controller/consulta/criar-consulta/cadastrar-consulta.controller';
import { IConsultaGateway } from '../operation/gateway/consulta/Iconsulta.gateway';
import { ConsultaGateway } from '../operation/gateway/consulta/consulta.gateway';
import { ListarConsultaUseCase } from 'src/core/consulta/usecase/listar-consulta/listar-consulta.usecase';
import { ListarConsultaController } from '../operation/controller/consulta/listar-consulta/listar-consulta.controller';
import { AtualizarConsultaUseCase } from 'src/core/consulta/usecase/atualizar-consulta/atualizar-consulta.usecase';
import { AtualizarConsultaController } from '../operation/controller/consulta/atualizar-consulta/atualizar-consulta.controller';
import { IAgendaGateway } from '../operation/gateway/agenda/Iagenda.gateway';
import { AgendaPostgresRepository } from 'src/infrastructure/persistence/repositories/agenda/postgres/agenda-postgres.repository';
import { IAgendaRepository } from 'src/infrastructure/persistence/repositories/agenda/Iagenda.repository';
import { AgendaGateway } from '../operation/gateway/agenda/agenda.gateway';

const persistenceProviders: Provider[] = [
  PrismaService,
  {
    provide: IConsultaRepository,
    useFactory: (prisma: PrismaService) =>
      new ConsultaPostgresRepository(prisma),
    inject: [PrismaService],
  },
  {
    provide: IAgendaRepository,
    useFactory: (prisma: PrismaService) =>
      new AgendaPostgresRepository(prisma),
    inject: [PrismaService],
  },
  {
    provide: IConsultaGateway,
    useFactory: (repository: IConsultaRepository) =>
      new ConsultaGateway(repository),
    inject: [IConsultaRepository],
  },
  {
    provide: IAgendaGateway,
    useFactory: (repository: IAgendaRepository) =>
      new AgendaGateway(repository),
    inject: [IAgendaRepository],
  }
];

const useCaseProviders: Provider[] = [
  {
    provide: CadastrarConsultaUseCase,
    useFactory: (consutlaGateway: IConsultaGateway) =>
      new CadastrarConsultaUseCase(consutlaGateway),
    inject: [IConsultaGateway],
  },
  {
    provide: ListarConsultaUseCase,
    useFactory: (consutlaGateway: IConsultaGateway) =>
      new ListarConsultaUseCase(consutlaGateway),
    inject: [IConsultaGateway],
  },
  {
    provide: AtualizarConsultaUseCase,
    useFactory: (consutlaGateway: IConsultaGateway, agendaGateway: IAgendaGateway) =>
      new AtualizarConsultaUseCase(consutlaGateway, agendaGateway),
    inject: [IConsultaGateway, IAgendaGateway],
  }
];

const controllerProviders: Provider[] = [
  {
    provide: CadastrarConsultaController,
    useFactory: (cadastrarConsultaUseCase: CadastrarConsultaUseCase) =>
      new CadastrarConsultaController(cadastrarConsultaUseCase),
    inject: [CadastrarConsultaUseCase],
  },
  {
    provide: ListarConsultaController,
    useFactory: (listarConsultaUseCase: ListarConsultaUseCase) =>
      new ListarConsultaController(listarConsultaUseCase),
    inject: [ListarConsultaUseCase],
  },
  {
    provide: AtualizarConsultaController,
    useFactory: (atualizarConsultaUseCase: AtualizarConsultaUseCase) =>
      new AtualizarConsultaController(atualizarConsultaUseCase),
    inject: [AtualizarConsultaUseCase],
  }
];

@Module({
  imports: [],
  controllers: [ConsultaControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class ConsultaModule { }
