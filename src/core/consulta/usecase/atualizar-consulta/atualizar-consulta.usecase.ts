import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IConsultaGateway } from 'src/application/operation/gateway/consulta/Iconsulta.gateway';
import { AtualizarConsultaDto } from '../../dto/atualizar-consulta.dto';
import { Consulta, CONSULTA_STATUS } from '../../entity/consulta.entity';

@Injectable()
export class AtualizarConsultaUseCase {
  constructor(
    @Inject(IConsultaGateway)
    private consultaGateway: IConsultaGateway,
  ) { }

  async execute(consultaId: string, payload: AtualizarConsultaDto): Promise<Consulta> {

    const possveisStatus: string[] = Object.values(CONSULTA_STATUS)
    if (!possveisStatus.includes(payload.status)) {
      throw new BadRequestException('Status inválido')
    }

    const consultaExiste = await this.consultaGateway.buscarConsultaPorId(consultaId)
    if (!consultaExiste) throw new BadRequestException('Consulta não existe')

    const consultaAtualizada = await this.consultaGateway.atualizaConculta(consultaId, payload.status);

    //atualizar agenda

    return consultaAtualizada;
  }
}
