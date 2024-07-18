import { Consulta } from 'src/core/consulta/entity/consulta.entity';

export interface IConsultaRepository {
  criar(consulta: Consulta): Promise<Consulta>;
  listar(crmOrCpf: string): Promise<Consulta[]>;
  buscarPorId(consultaId: string): Promise<Consulta | undefined>
  atualiza(consultaId: string, status: string): Promise<Consulta>
}

export const IConsultaRepository = Symbol('IConsultaRepository');
