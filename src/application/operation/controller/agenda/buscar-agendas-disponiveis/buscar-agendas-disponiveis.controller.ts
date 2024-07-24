import { Inject } from '@nestjs/common';
import { BuscarAgendasDisponiveisDto } from '../../../../../core/agenda/dto/buscar-agendas-disponiveis.dto';
import { Agenda } from '../../../../../core/agenda/entity/agenda.entity';
import { BuscarAgendasDisponiveisUseCase } from '../../../../../core/agenda/usecase/buscar-agendas-disponiveis/buscar-agendas-disponiveis.usecase';

export class BuscarAgendasDisponiveisController {
  constructor(
    @Inject(BuscarAgendasDisponiveisUseCase)
    private buscarAgendasDisponiveisUseCase: BuscarAgendasDisponiveisUseCase,
  ) { }

  async handle(payload: BuscarAgendasDisponiveisDto): Promise<Agenda[]> {

    const agendasDisponiveis = await this.buscarAgendasDisponiveisUseCase.execute(payload)
    return agendasDisponiveis;
  }
}
