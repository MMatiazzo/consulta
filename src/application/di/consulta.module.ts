// import { Module } from '@nestjs/common';
// import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
// import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';


// import { CriarPagamentoUseCase } from 'src/core/pagamento/usecase/criar-pagamento/criar-pagamento.usecase';
// import { CriarPagamentoController } from '../operation/controllers/pagamento/criar-pagamento/criar-pagamento.controller';
// import { IPagamentoGateway } from '../operation/gateways/pagamento/Ipagamento.gateway';

// const persistenceProviders: Provider[] = [
//   PrismaService
// ];

// const useCaseProviders: Provider[] = [
//   {
//     provide: CriarPagamentoUseCase,
//     useFactory: (pagamentoGateway: IPagamentoGateway) =>
//       new CriarPagamentoUseCase(pagamentoGateway),
//     inject: [IPagamentoGateway],
//   }
// ];

// const controllerProviders: Provider[] = [
//   {
//     provide: CriarPagamentoController,
//     useFactory: (criarPagamentoUseCase: CriarPagamentoUseCase) =>
//       new CriarPagamentoController(criarPagamentoUseCase),
//     inject: [CriarPagamentoUseCase],
//   }
// ];

// @Module({
//   imports: [],
//   controllers: [ConsultaControllerRoute],
//   providers: [
//     ...persistenceProviders,
//     ...useCaseProviders,
//     ...controllerProviders,
//   ],
// })
// export class ConsultaModule { }
