import { Consulta } from 'src/core/consulta/entity/consulta.entity';

export interface IConsultaGateway {
  cadastrarConsulta(consulta: Consulta): Promise<Consulta>;
  listarConsultas(crmOrCpf: string): Promise<Consulta[]>;
  buscarConsultaPorId(consultaId: string): Promise<Consulta | undefined>
  atualizaConsulta(consultaId: string, status: string): Promise<Consulta>
}

export const IConsultaGateway = Symbol('IConsultaGateway');
