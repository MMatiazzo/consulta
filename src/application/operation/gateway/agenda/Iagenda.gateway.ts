import { Agenda } from '../../../../core/agenda/entity/agenda.entity';

export interface IAgendaGateway {
  cadastrarAgenda(agenda: Agenda): Promise<Agenda>;
  buscarAgendasDisponiveis(crm: string): Promise<Agenda[]>
  buscarAgendaPorId(id: string): Promise<Agenda>
  deletarAgenda(id: string): Promise<void>;
  buscarAgendasDisponiveis(crm: string): Promise<Agenda[]>;
  atualizarAgenda(agendaId: string, status: boolean): Promise<void>;
}

export const IAgendaGateway = Symbol('IAgendaGateway');
