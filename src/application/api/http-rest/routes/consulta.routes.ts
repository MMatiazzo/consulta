import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CadastrarConsultaController } from 'src/application/operation/controller/consulta/criar-consulta/cadastrar-consulta.controller';
import { CadastrarConsultaDto } from 'src/core/consulta/dto/cadastrar-consulta.dto';
import { Consulta } from 'src/core/consulta/entity/consulta.entity';

@Controller('/consulta')
export class ConsultaControllerRoute {
  constructor(
    @Inject(CadastrarConsultaController)
    private criarConsultaController: CadastrarConsultaController,
  ) { }

  @Post('/')
  async cadastrar(@Body() payload: CadastrarConsultaDto): Promise<Consulta> {
    const consultaCriada = await this.criarConsultaController.handle(payload);
    return consultaCriada;
  }
}
