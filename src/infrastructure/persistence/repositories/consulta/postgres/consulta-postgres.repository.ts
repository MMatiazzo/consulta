import { Inject, Injectable } from '@nestjs/common';
import { Consulta } from 'src/core/consulta/entity/consulta.entity';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import { IConsultaRepository } from '../Iconsulta.repository';

@Injectable()
export class ConsultaPostgresRepository implements IConsultaRepository {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService
  ) { }

  async criar(consulta: Consulta): Promise<Consulta> {
    try {
      const novaConsulta = await this.prisma.consulta.create({
        data: { ...consulta },
      });
      return novaConsulta;
    } catch (err) {
      throw new err;
    }
  }
}
