import { Inject } from '@nestjs/common';
import { Consulta } from 'src/core/consulta/entity/consulta.entity';
import { IAgendaRepository } from 'src/infrastructure/persistence/repositories/agenda/Iagenda.repository';
import { IConsultaGateway } from './Iconsulta.gateway';
import { IConsultaRepository } from 'src/infrastructure/persistence/repositories/consulta/Iconsulta.repository';

export class ConsultaGateway implements IConsultaGateway {
  constructor(
    @Inject(IConsultaRepository)
    private consultaRepository: IConsultaRepository,
  ) { }

  async cadastrarConculta(consulta: Consulta): Promise<Consulta> {
    const agendaCadastrada = await this.consultaRepository.criar(consulta);
    return agendaCadastrada;
  }
}
