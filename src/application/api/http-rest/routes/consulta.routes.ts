import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { AtualizarConsultaController } from '../../../../application/operation/controller/consulta/atualizar-consulta/atualizar-consulta.controller';
import { CadastrarConsultaController } from '../../../../application/operation/controller/consulta/criar-consulta/cadastrar-consulta.controller';
import { ListarConsultaController } from '../../../../application/operation/controller/consulta/listar-consulta/listar-consulta.controller';
import { AtualizarConsultaDto } from '../../../../core/consulta/dto/atualizar-consulta.dto';
import { CadastrarConsultaDto } from '../../../../core/consulta/dto/cadastrar-consulta.dto';
import { ListarConsultasDto } from '../../../../core/consulta/dto/listar-consulta.dto';
import { Consulta } from '../../../../core/consulta/entity/consulta.entity';

@Controller('/consulta')
export class ConsultaControllerRoute {
  constructor(
    @Inject(CadastrarConsultaController)
    private criarConsultaController: CadastrarConsultaController,

    @Inject(ListarConsultaController)
    private listarConsultaController: ListarConsultaController,

    @Inject(AtualizarConsultaController)
    private atualizarConsultaController: AtualizarConsultaController,
  ) { }

  @Post('/cadastrar')
  async cadastrar(@Body() payload: CadastrarConsultaDto): Promise<Consulta> {
    const consultaCriada = await this.criarConsultaController.handle(payload);
    return consultaCriada;
  }

  @Get('/listar')
  async listar(@Query() payload: ListarConsultasDto): Promise<Consulta[]> {
    const consultaCriada = await this.listarConsultaController.handle(payload.crmOrCpf);
    return consultaCriada;
  }

  @Put('/atualizar/:consultaId')
  async atualizar(@Param() { consultaId }, @Body() payload: AtualizarConsultaDto): Promise<Consulta> {
    const consultaAtualizada = await this.atualizarConsultaController.handle(consultaId, payload);
    return consultaAtualizada;
  }
}
