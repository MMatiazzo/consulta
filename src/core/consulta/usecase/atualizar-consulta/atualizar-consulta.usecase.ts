import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IConsultaGateway } from '../../../../application/operation/gateway/consulta/Iconsulta.gateway';
import { AtualizarConsultaDto } from '../../dto/atualizar-consulta.dto';
import { Consulta, CONSULTA_STATUS } from '../../entity/consulta.entity';
import { IAgendaGateway } from '../../../../application/operation/gateway/agenda/Iagenda.gateway';

@Injectable()
export class AtualizarConsultaUseCase {
  constructor(
    @Inject(IConsultaGateway)
    private consultaGateway: IConsultaGateway,

    @Inject(IAgendaGateway)
    private agendaGateway: IAgendaGateway,
  ) { }

  async execute(consultaId: string, payload: AtualizarConsultaDto): Promise<Consulta> {

    const possveisStatus: string[] = Object.values(CONSULTA_STATUS)
    if (!possveisStatus.includes(payload.status)) {
      throw new BadRequestException('Status inválido')
    }

    const consultaExiste = await this.consultaGateway.buscarConsultaPorId(consultaId)
    if (!consultaExiste) throw new BadRequestException('Consulta não existe')

    const consultaAtualizada = await this.consultaGateway.atualizaConsulta(consultaId, payload.status);

    const toStatus = !(payload.status !== CONSULTA_STATUS.ACEITA && payload.status !== CONSULTA_STATUS.SOLICITADA);

    await this.agendaGateway.atualizarAgenda(consultaAtualizada.id_agenda, toStatus);

    return consultaAtualizada;
  }
}
