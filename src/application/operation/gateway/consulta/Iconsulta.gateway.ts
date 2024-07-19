import { Consulta } from 'src/core/consulta/entity/consulta.entity';

export interface IConsultaGateway {
  cadastrarConculta(consulta: Consulta): Promise<Consulta>;
  listarConcultas(crmOrCpf: string): Promise<Consulta[]>;
  buscarConsultaPorId(consultaId: string): Promise<Consulta | undefined>
  atualizaConculta(consultaId: string, status: string): Promise<Consulta>
}

export const IConsultaGateway = Symbol('IConsultaGateway');
