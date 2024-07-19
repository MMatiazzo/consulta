import { Inject, Injectable } from '@nestjs/common';

import { IAgendaGateway } from 'src/application/operation/gateway/agenda/Iagenda.gateway';
import { BuscarAgendasDisponiveisDto } from '../../dto/buscar-agendas-disponiveis.dto';
import { Agenda } from '../../entity/agenda.entity';

@Injectable()
export class BuscarAgendasDisponiveisUseCase {
  constructor(
    @Inject(IAgendaGateway)
    private agendaGateway: IAgendaGateway,
  ) { }

  async execute(payload: BuscarAgendasDisponiveisDto): Promise<Agenda[]> {

    const crm = payload.crm || null

    const agendasDisponiveis = await this.agendaGateway.buscarAgendasDisponiveis(crm)
    return agendasDisponiveis;
  }
}
