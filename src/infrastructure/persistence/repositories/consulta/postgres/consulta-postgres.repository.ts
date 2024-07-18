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

  async listar(crmOrCpf: string): Promise<Consulta[]> {
    return this.prisma.consulta.findMany({
      where: {
        OR: [
          {
            crm_medico: crmOrCpf
          },
          {
            cpf_paciente: crmOrCpf
          }
        ]
      }
    })
  }

  async buscarPorId(consultaId: string): Promise<Consulta | undefined> {
    return this.prisma.consulta.findUnique({
      where: {
        id: consultaId
      }
    })
  }

  async atualiza(consultaId: string, status: string): Promise<Consulta> {
    return this.prisma.consulta.update({
      where: { id: consultaId },
      data: {
        status
      }
    })
  }

}
