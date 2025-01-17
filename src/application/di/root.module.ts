import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER } from '@nestjs/core';
// import { ConsultaModule } from './consulta.module';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { AgendaModule } from './agenda.module';
import { ConsultaModule } from './consulta.module';

@Module({
  imports: [AgendaModule, ConsultaModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ]
})
export class RootModule { }
