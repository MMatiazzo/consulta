import { Inject, Injectable } from '@nestjs/common';

import { IConsultaGateway } from 'src/application/operation/gateway/consulta/Iconsulta.gateway';
import { Consulta } from '../../entity/consulta.entity';

@Injectable()
export class ListarConsultaUseCase {
  constructor(
    @Inject(IConsultaGateway)
    private consultaGateway: IConsultaGateway,
  ) { }

  async execute(payload: string): Promise<Consulta[]> {
    const consultas = await this.consultaGateway.listarConsultas(payload);
    return consultas;
  }
}
