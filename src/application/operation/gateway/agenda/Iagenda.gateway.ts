import { Agenda } from 'src/core/agenda/entity/agenda.entity';

export interface IAgendaGateway {
  cadastrarAgenda(agenda: Agenda): Promise<Agenda>;
}

export const IAgendaGateway = Symbol('IAgendaGateway');
