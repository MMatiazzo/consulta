import { Inject } from '@nestjs/common';
import { CadastrarAgendaDto } from '../../../../../core/agenda/dto/cadastrar-agenda.dto';
import { Agenda } from '../../../../../core/agenda/entity/agenda.entity';
import { CadastrarAgendaUseCase } from '../../../../../core/agenda/usecase/cadastrar-agenda/cadastrar-agenda.usecase';

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
