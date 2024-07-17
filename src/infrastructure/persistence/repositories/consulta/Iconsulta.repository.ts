import { Consulta } from 'src/core/consulta/entity/consulta.entity';

export interface IConsultaRepository {
  criar(consulta: Consulta): Promise<Consulta>;
  listar(crmOrCpf: string): Promise<Consulta[]>;
}

export const IConsultaRepository = Symbol('IConsultaRepository');
