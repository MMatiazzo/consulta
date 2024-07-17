import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CadastrarAgendaController } from 'src/application/operation/controller/agenda/cadastrar-agenda/cadastrar-agenda.controller';
import { CadastrarAgendaDto } from 'src/core/agenda/dto/cadastrar-agenda.dto';
import { Agenda } from 'src/core/agenda/entity/agenda.entity';

@Controller('/agenda')
export class AgendaControllerRoute {
  constructor(
    @Inject(CadastrarAgendaController)
    private cadastrarAgendaController: CadastrarAgendaController,

  ) { }

  @Post('/')
  async cadastrar(@Body() payload: CadastrarAgendaDto): Promise<Agenda> {
    const agendaCadastrada = await this.cadastrarAgendaController.handle(payload);
    return agendaCadastrada;
  }
}
