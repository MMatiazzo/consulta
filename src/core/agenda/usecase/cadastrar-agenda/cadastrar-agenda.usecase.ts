import { Inject, Injectable } from '@nestjs/common';

import { CadastrarAgendaDto } from '../../dto/cadastrar-agenda.dto';
import { Agenda } from '../../entity/agenda.entity';
import { IAgendaGateway } from '../../../../application/operation/gateway/agenda/Iagenda.gateway';

@Injectable()
export class CadastrarAgendaUseCase {
  constructor(
    @Inject(IAgendaGateway)
    private agendaGateway: IAgendaGateway,
  ) { }

  async execute(payload: CadastrarAgendaDto): Promise<Agenda> {
    const novaAgenda = Agenda.new(payload)

    const agendaCadastrada = await this.agendaGateway.cadastrarAgenda(novaAgenda)
    return agendaCadastrada;
  }
}
