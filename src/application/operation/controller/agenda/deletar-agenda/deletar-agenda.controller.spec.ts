import { Test, TestingModule } from '@nestjs/testing';
import { DeletarAgendaController } from './deletar-agenda.controller';
import { DeletarAgendaUseCase } from '../../../../../core/agenda/usecase/deletar-agenda/deletar-agenda.usecase';
import { DeletarAgendaDto } from '../../../../../core/agenda/dto/deletar-agenda.dto';

describe('DeletarAgendaController', () => {
  let controller: DeletarAgendaController;
  let useCaseMock: DeletarAgendaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletarAgendaController],
      providers: [
        {
          provide: DeletarAgendaUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<DeletarAgendaController>(DeletarAgendaController);
    useCaseMock = module.get<DeletarAgendaUseCase>(DeletarAgendaUseCase);
  });

  describe('handle', () => {
    it('Deve ser possível deletar uma agenda passando pelo usecase com o payload correto', async () => {
      const dto: DeletarAgendaDto = {
        agendaId: '123456789',
      };

      await controller.handle(dto);

      expect(useCaseMock.execute).toHaveBeenCalledWith(dto);
    });
  });
});
