import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IAgendaGateway } from 'src/application/operation/gateway/agenda/Iagenda.gateway';
import { DeletarAgendaDto } from '../../dto/deletar-agenda.dto';

@Injectable()
export class DeletarAgendaUseCase {
  constructor(
    @Inject(IAgendaGateway)
    private agendaGateway: IAgendaGateway,
  ) { }

  async execute(payload: DeletarAgendaDto): Promise<void> {

    const agendaExiste = await this.agendaGateway.buscarAgendaPorId(payload.agendaId)

    if(!agendaExiste) throw new BadRequestException("Agenda não existe!")

    if(agendaExiste.ocupado) throw new BadRequestException("Agenda está ocupada!")

    await this.agendaGateway.deletarAgenda(payload.agendaId)
  }
}
