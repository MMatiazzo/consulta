import { Inject, Injectable } from '@nestjs/common';
import { Agenda } from 'src/core/agenda/entity/agenda.entity';
import { IAgendaRepository } from '../Iagenda.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class AgendaPostgresRepository implements IAgendaRepository {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService
  ) { }

  async criar(agenda: Agenda): Promise<Agenda> {
    const novaAgenda = await this.prisma.agenda.create({
      data: { ...agenda },
    });
    return novaAgenda;
  }

  async buscar(crm: string | null): Promise<Agenda[]> {

    let whereClause = {};

    if (crm !== null) {
      whereClause = {
        crm_medico: crm
      };
    }

    whereClause['ocupado'] = false

    const agendas = await this.prisma.agenda.findMany({
      where: whereClause
    });

    return agendas;
  }
}
