import { Inject, Injectable } from '@nestjs/common';

import { IConsultaGateway } from 'src/application/operation/gateway/consulta/Iconsulta.gateway';
import { CadastrarConsultaDto } from '../../dto/cadastrar-consulta.dto';
import { Consulta } from '../../entity/consulta.entity';

@Injectable()
export class CadastrarConsultaUseCase {
  constructor(
    @Inject(IConsultaGateway)
    private consultaGateway: IConsultaGateway,
  ) { }

  async execute(payload: CadastrarConsultaDto): Promise<Consulta> {
    const novaConsulta = Consulta.new(payload);

    const agendaCadastrada = await this.consultaGateway.cadastrarConculta(novaConsulta);
    return agendaCadastrada;
  }
}
