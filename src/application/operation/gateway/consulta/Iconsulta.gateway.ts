import { Consulta } from 'src/core/consulta/entity/consulta.entity';

export interface IConsultaGateway {
  cadastrarConculta(consulta: Consulta): Promise<Consulta>;
}

export const IConsultaGateway = Symbol('IConsultaGateway');
