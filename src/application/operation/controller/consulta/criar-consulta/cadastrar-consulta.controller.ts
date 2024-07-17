import { Inject } from '@nestjs/common';
import { CadastrarConsultaDto } from 'src/core/consulta/dto/cadastrar-consulta.dto';
import { Consulta } from 'src/core/consulta/entity/consulta.entity';
import { CadastrarConsultaUseCase } from 'src/core/consulta/usecase/cadastrar-consulta/cadastrar-consulta.usecase';

export class CadastrarConsultaController {
  constructor(
    @Inject(CadastrarConsultaUseCase)
    private cadastrarConsultaUseCase: CadastrarConsultaUseCase,
  ) { }

  async handle(consulta: CadastrarConsultaDto): Promise<Consulta> {
    const consultaCriada = await this.cadastrarConsultaUseCase.execute(consulta)
    return consultaCriada;
  }
}
