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

const persistenceProviders: Provider[] = [
  PrismaService,
  {
    provide: IConsultaRepository,
    useFactory: (prisma: PrismaService) =>
      new ConsultaPostgresRepository(prisma),
    inject: [PrismaService],
  },
  {
    provide: IConsultaGateway,
    useFactory: (repository: IConsultaRepository) =>
      new ConsultaGateway(repository),
    inject: [IConsultaRepository],
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
