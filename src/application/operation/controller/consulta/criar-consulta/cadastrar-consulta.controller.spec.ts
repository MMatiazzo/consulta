import { Test, TestingModule } from '@nestjs/testing';
import { CadastrarConsultaController } from './cadastrar-consulta.controller';
import { CadastrarConsultaUseCase } from '../../../../../core/consulta/usecase/cadastrar-consulta/cadastrar-consulta.usecase';
import { Consulta } from '../../../../../core/consulta/entity/consulta.entity';
import { CadastrarConsultaDto } from '../../../../../core/consulta/dto/cadastrar-consulta.dto';

describe('CadastrarConsultaController', () => {
  let controller: CadastrarConsultaController;
  let useCaseMock: CadastrarConsultaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadastrarConsultaController],
      providers: [
        {
          provide: CadastrarConsultaUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<CadastrarConsultaController>(CadastrarConsultaController);
    useCaseMock = module.get<CadastrarConsultaUseCase>(CadastrarConsultaUseCase);
  });

  describe('handle', () => {
    it('Deve ser possível cadastrar uma consulta passando pelo usecase com os parâmetros corretos', async () => {
      const payload: CadastrarConsultaDto = {
        id_agenda: 'agendaId',
        crm_medico: 'crm_medico',
        cpf_paciente: 'cpf_paciente',
        status: 'solicitada',
      };

      const expectedConsulta: Consulta = {
        id_agenda: 'agendaId',
        crm_medico: 'crm_medico',
        cpf_paciente: 'cpf_paciente',
        status: 'solicitada',
      };

      (useCaseMock.execute as jest.Mock).mockResolvedValue(expectedConsulta);

      const result = await controller.handle(payload);

      expect(result).toEqual(expectedConsulta);
      expect(useCaseMock.execute).toHaveBeenCalledWith(payload);
    });

  });
});
