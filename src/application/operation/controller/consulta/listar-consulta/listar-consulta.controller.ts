import { Inject } from '@nestjs/common';
import { Consulta } from '../../../../../core/consulta/entity/consulta.entity';
import { ListarConsultaUseCase } from '../../../../../core/consulta/usecase/listar-consulta/listar-consulta.usecase';

export class ListarConsultaController {
  constructor(
    @Inject(ListarConsultaUseCase)
    private listarConsultaUseCase: ListarConsultaUseCase,
  ) { }

  async handle(payload: string): Promise<Consulta[]> {
    const consultas = await this.listarConsultaUseCase.execute(payload)
    return consultas;
  }
}
