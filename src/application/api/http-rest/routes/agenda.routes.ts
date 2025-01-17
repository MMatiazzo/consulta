import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { BuscarAgendasDisponiveisController } from '../../../../application/operation/controller/agenda/buscar-agendas-disponiveis/buscar-agendas-disponiveis.controller';
import { CadastrarAgendaController } from '../../../../application/operation/controller/agenda/cadastrar-agenda/cadastrar-agenda.controller';
import { DeletarAgendaController } from '../../../../application/operation/controller/agenda/deletar-agenda/deletar-agenda.controller';
import { BuscarAgendasDisponiveisDto } from '../../../../core/agenda/dto/buscar-agendas-disponiveis.dto';
import { CadastrarAgendaDto } from '../../../../core/agenda/dto/cadastrar-agenda.dto';
import { DeletarAgendaDto } from '../../../../core/agenda/dto/deletar-agenda.dto';
import { Agenda } from '../../../../core/agenda/entity/agenda.entity';

@Controller('/agenda')
export class AgendaControllerRoute {
  constructor(
    @Inject(CadastrarAgendaController)
    private cadastrarAgendaController: CadastrarAgendaController,

    @Inject(BuscarAgendasDisponiveisController)
    private buscarAgendasDisponiveisController: BuscarAgendasDisponiveisController,

    @Inject(DeletarAgendaController)
    private deletarAgendaController: DeletarAgendaController,

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

  @Delete('/deletar/:agendaId')
  async deletar(@Param() payload: DeletarAgendaDto): Promise<void> {
    await this.deletarAgendaController.handle(payload);
  }
}
