import { Test, TestingModule } from '@nestjs/testing';
import { CadastrarAgendaController } from './cadastrar-agenda.controller';
import { CadastrarAgendaUseCase } from '../../../../../core/agenda/usecase/cadastrar-agenda/cadastrar-agenda.usecase';
import { Agenda } from '../../../../../core/agenda/entity/agenda.entity';
import { CadastrarAgendaDto } from '../../../../../core/agenda/dto/cadastrar-agenda.dto';

describe('CadastrarAgendaController', () => {
  let controller: CadastrarAgendaController;
  let useCaseMock: CadastrarAgendaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadastrarAgendaController],
      providers: [
        {
          provide: CadastrarAgendaUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<CadastrarAgendaController>(CadastrarAgendaController);
    useCaseMock = module.get<CadastrarAgendaUseCase>(CadastrarAgendaUseCase);
  });

  describe('handle', () => {
    it('Deve ser possível returnar agenda cadastrada do usecase', async () => {
      const dto: CadastrarAgendaDto = {
        crm: '123456789',
        horario: new Date(),
      };

      const expectedAgenda: Agenda = {
        crm_medico: dto.crm,
        data_horario: dto.horario,
        ocupado: false,
      };

      (useCaseMock.execute as jest.Mock).mockResolvedValue(expectedAgenda);

      const result = await controller.handle(dto);

      expect(result).toEqual(expectedAgenda);
      expect(useCaseMock.execute).toHaveBeenCalledWith(dto);
    });
  });
});
