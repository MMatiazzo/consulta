import { Inject } from '@nestjs/common';
import { Agenda } from 'src/core/agenda/entity/agenda.entity';
import { IAgendaRepository } from 'src/infrastructure/persistence/repositories/agenda/Iagenda.repository';
import { IAgendaGateway } from './Iagenda.gateway';

export class AgendaGateway implements IAgendaGateway {
  constructor(
    @Inject(IAgendaRepository)
    private agendaRepository: IAgendaRepository,
  ) { }

  async cadastrarAgenda(agenda: Agenda): Promise<Agenda> {
    const agendaCadastrada = await this.agendaRepository.criar(agenda);
    return agendaCadastrada
  }
}
