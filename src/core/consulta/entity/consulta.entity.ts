import { CadastrarConsultaDto } from "../dto/cadastrar-consulta.dto";

export enum CONSULTA_STATUS {
  SOLICITADA = 'solicitada',
  RECUSADA = 'recusada',
  ACEITA = 'aceita',
  CANCELADA = 'cancelada',
  REALIZADA = 'realizada'
}

export class Consulta {
  id_agenda: string;
  crm_medico: string;
  cpf_paciente: string;
  status: string;

  private constructor(paylod: CadastrarConsultaDto) {
    this.id_agenda = paylod.id_agenda;
    this.crm_medico = paylod.crm_medico;
    this.cpf_paciente = paylod.cpf_paciente; 
    this.status = paylod.status;
  }

  public static new(payload: CadastrarConsultaDto) {
    const agenda = new Consulta(payload);
    return agenda;
  }
}
