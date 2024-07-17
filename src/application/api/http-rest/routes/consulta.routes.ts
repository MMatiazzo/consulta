import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CadastrarConsultaController } from 'src/application/operation/controller/consulta/criar-consulta/cadastrar-consulta.controller';
import { ListarConsultaController } from 'src/application/operation/controller/consulta/listar-consulta/listar-consulta.controller';
import { CadastrarConsultaDto } from 'src/core/consulta/dto/cadastrar-consulta.dto';
import { ListarConsultasDto } from 'src/core/consulta/dto/listar-consulta.dto';
import { Consulta } from 'src/core/consulta/entity/consulta.entity';

@Controller('/consulta')
export class ConsultaControllerRoute {
  constructor(
    @Inject(CadastrarConsultaController)
    private criarConsultaController: CadastrarConsultaController,
    @Inject(ListarConsultaController)
    private listarConsultaController: ListarConsultaController,
  ) { }

  @Post('/')
  async cadastrar(@Body() payload: CadastrarConsultaDto): Promise<Consulta> {
    const consultaCriada = await this.criarConsultaController.handle(payload);
    return consultaCriada;
  }

  @Get('/')
  async listar(@Query() payload: ListarConsultasDto): Promise<Consulta[]> {
    const consultaCriada = await this.listarConsultaController.handle(payload.crmOrCpf);
    return consultaCriada;
  }
}
