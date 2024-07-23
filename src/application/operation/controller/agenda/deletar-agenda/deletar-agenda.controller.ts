import { Inject } from '@nestjs/common';
import { DeletarAgendaDto } from 'src/core/agenda/dto/deletar-agenda.dto';
import { DeletarAgendaUseCase } from 'src/core/agenda/usecase/deletar-agenda/deletar-agenda.usecase';

export class DeletarAgendaController {
  constructor(
    @Inject(DeletarAgendaUseCase)
    private deletarAgendaUseCase: DeletarAgendaUseCase,
  ) { }

  async handle(payload: DeletarAgendaDto): Promise<void> {
    await this.deletarAgendaUseCase.execute(payload)
  }
}
