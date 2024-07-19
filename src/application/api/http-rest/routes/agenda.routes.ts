import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { BuscarAgendasDisponiveisController } from 'src/application/operation/controller/agenda/buscar-agendas-disponiveis/buscar-agendas-disponiveis.controller';
import { CadastrarAgendaController } from 'src/application/operation/controller/agenda/cadastrar-agenda/cadastrar-agenda.controller';
import { BuscarAgendasDisponiveisDto } from 'src/core/agenda/dto/buscar-agendas-disponiveis.dto';
import { CadastrarAgendaDto } from 'src/core/agenda/dto/cadastrar-agenda.dto';
import { Agenda } from 'src/core/agenda/entity/agenda.entity';

@Controller('/agenda')
export class AgendaControllerRoute {
  constructor(
    @Inject(CadastrarAgendaController)
    private cadastrarAgendaController: CadastrarAgendaController,

    @Inject(BuscarAgendasDisponiveisController)
    private buscarAgendasDisponiveisController: BuscarAgendasDisponiveisController,

  ) { }

  @Post('/cadastrar')
  async cadastrar(@Body() payload: CadastrarAgendaDto): Promise<Agenda> {
    const agendaCadastrada = await this.cadastrarAgendaController.handle(payload);
    return agendaCadastrada;
  }

  @Get('/buscar')
  async buscar(@Query() payload: BuscarAgendasDisponiveisDto): Promise<Agenda[]> {
    const agendasDisponiveis = await this.buscarAgendasDisponiveisController.handle(payload);
    return agendasDisponiveis;
  }
}
