import { Agenda } from 'src/core/agenda/entity/agenda.entity';

export interface IAgendaRepository {
  criar(agenda: Agenda): Promise<Agenda>;
  buscar(crm: string | null): Promise<Agenda[]>
}

export const IAgendaRepository = Symbol('IAgendaRepository');
