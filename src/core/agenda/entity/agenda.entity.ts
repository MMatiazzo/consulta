import { CadastrarAgendaDto } from "../dto/cadastrar-agenda.dto";

export class Agenda {
  crm_medico: string;
  data_horario: Date;
  ocupado: boolean

  private constructor(paylod: CadastrarAgendaDto) {
    this.crm_medico = paylod.crm;
    this.data_horario = paylod.horario;
    this.ocupado = false;
  }

  public static new(payload: CadastrarAgendaDto) {
    const agenda = new Agenda(payload);
    return agenda;
  }
}
