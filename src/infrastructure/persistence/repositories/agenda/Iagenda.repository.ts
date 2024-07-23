import { Agenda } from 'src/core/agenda/entity/agenda.entity';

export interface IAgendaRepository {
  criar(agenda: Agenda): Promise<Agenda>;
  buscar(crm: string | null): Promise<Agenda[]>
  buscarPorId(id: string): Promise<Agenda | null>
  deletar(id: string): Promise<void>
}

export const IAgendaRepository = Symbol('IAgendaRepository');
