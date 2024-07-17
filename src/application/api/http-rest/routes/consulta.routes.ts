// import { Body, Controller, Inject, Post } from '@nestjs/common';

// @Controller('/consulta')
// export class ConsultaControllerRoute {
//   constructor(
//     @Inject(CriarConsultaController)
//     private criarConsultaController: CriarConsultaController,

//   ) { }

//   @Post('/consulta')
//   async cadastrar(@Body() payload: ConsultaDto): Promise<Consulta> {
//     const consultaCriada = await this.criarConsultaController.handle(payload);
//     return consultaCriada;
//   }
// }
