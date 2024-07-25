import { Inject } from '@nestjs/common';
import { AtualizarConsultaDto } from '../../../../../core/consulta/dto/atualizar-consulta.dto';
import { Consulta } from '../../../../../core/consulta/entity/consulta.entity';
import { AtualizarConsultaUseCase } from '../../../../../core/consulta/usecase/atualizar-consulta/atualizar-consulta.usecase';

export class AtualizarConsultaController {
  constructor(
    @Inject(AtualizarConsultaUseCase)
    private atualizarConsultaUseCase: AtualizarConsultaUseCase,
  ) { }

  async handle(consultaId: string, payload: AtualizarConsultaDto): Promise<Consulta> {
    const consultaAtualizada = await this.atualizarConsultaUseCase.execute(consultaId, payload)
    return consultaAtualizada;
  }
}
