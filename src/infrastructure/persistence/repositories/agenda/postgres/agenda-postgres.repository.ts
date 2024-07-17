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
}
