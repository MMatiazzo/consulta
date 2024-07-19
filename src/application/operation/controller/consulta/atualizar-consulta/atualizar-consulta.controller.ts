import { Inject } from '@nestjs/common';
import { AtualizarConsultaDto } from 'src/core/consulta/dto/atualizar-consulta.dto';
import { Consulta } from 'src/core/consulta/entity/consulta.entity';
import { AtualizarConsultaUseCase } from 'src/core/consulta/usecase/atualizar-consulta/atualizar-consulta.usecase';

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
