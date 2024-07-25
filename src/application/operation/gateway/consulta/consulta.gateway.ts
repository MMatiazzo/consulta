import { Inject } from '@nestjs/common';
import { Consulta } from '../../../../core/consulta/entity/consulta.entity';
import { IConsultaRepository } from '../../../../infrastructure/persistence/repositories/consulta/Iconsulta.repository';
import { IConsultaGateway } from './Iconsulta.gateway';

export class ConsultaGateway implements IConsultaGateway {
  constructor(
    @Inject(IConsultaRepository)
    private consultaRepository: IConsultaRepository,
  ) { }

  async cadastrarConsulta(consulta: Consulta): Promise<Consulta> {
    const agendaCadastrada = await this.consultaRepository.criar(consulta);
    return agendaCadastrada;
  }

  async listarConsultas(crmOrCpf: string): Promise<Consulta[]> {
    return this.consultaRepository.listar(crmOrCpf);
  }

  async buscarConsultaPorId(consultaId: string): Promise<Consulta | undefined> {
    return this.consultaRepository.buscarPorId(consultaId);
  }

  async atualizaConsulta(consultaId: string, status: string): Promise<Consulta> {
    return this.consultaRepository.atualiza(consultaId, status);
  }
  
}
