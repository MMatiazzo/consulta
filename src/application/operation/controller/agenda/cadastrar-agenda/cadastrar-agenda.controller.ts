import { Inject } from '@nestjs/common';
import { CadastrarAgendaDto } from 'src/core/agenda/dto/cadastrar-agenda.dto';
import { Agenda } from 'src/core/agenda/entity/agenda.entity';
import { CadastrarAgendaUseCase } from 'src/core/agenda/usecase/cadastrar-agenda/cadastrar-agenda.usecase';

export class CadastrarAgendaController {
  constructor(
    @Inject(CadastrarAgendaUseCase)
    private cadastrarAgendaUseCase: CadastrarAgendaUseCase,
  ) { }

  async handle(agenda: CadastrarAgendaDto): Promise<Agenda> {

    const agendaCadastrada = await this.cadastrarAgendaUseCase.execute(agenda)
    return agendaCadastrada;
  }
}
