import { Test, TestingModule } from '@nestjs/testing';
import { CadastrarConsultaUseCase } from './cadastrar-consulta.usecase';
import { CadastrarConsultaDto } from '../../dto/cadastrar-consulta.dto';
import { Consulta } from '../../entity/consulta.entity';
import { IConsultaGateway } from '../../../../application/operation/gateway/consulta/Iconsulta.gateway';

describe('CadastrarConsultaUseCase', () => {
  let useCase: CadastrarConsultaUseCase;
  let consultaGateway: IConsultaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CadastrarConsultaUseCase,
        {
          provide: IConsultaGateway,
          useFactory: () => ({
            cadastrarConsulta: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<CadastrarConsultaUseCase>(CadastrarConsultaUseCase);
    consultaGateway = module.get<IConsultaGateway>(IConsultaGateway);
  });

  describe('execute', () => {
    it('Deve ser possível cadastrar uma nova consulta', async () => {
      const dto: CadastrarConsultaDto = {
        id_agenda: 'agenda_id',
        crm_medico: '123456',
        cpf_paciente: '789012',
        status: 'solicitada',
      };

      const novaConsulta: Consulta = {
        ...dto,
        status: dto.status,
      };
      (consultaGateway.cadastrarConsulta as jest.Mock).mockResolvedValue(novaConsulta);

      const result = await useCase.execute(dto);

      expect(result).toEqual(novaConsulta);
      expect(consultaGateway.cadastrarConsulta).toHaveBeenCalledWith(expect.objectContaining(novaConsulta));
    });
  });
});
