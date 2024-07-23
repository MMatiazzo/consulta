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

  async buscarAgendasDisponiveis(crm: string): Promise<Agenda[]> {
    const agendasDisponiveis = await this.agendaRepository.buscar(crm);
    return agendasDisponiveis
  }

  async buscarAgendaPorId(id: string): Promise<Agenda> {
    const agendaExiste = await this.agendaRepository.buscarPorId(id);
    return agendaExiste
  }

  async deletarAgenda(id: string): Promise<void> {
    await this.agendaRepository.deletar(id)
  }
}
