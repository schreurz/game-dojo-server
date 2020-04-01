import { Test, TestingModule } from '@nestjs/testing';
import { TicTacToeController } from './tic-tac-toe.controller';
import { TicTacToeService } from './tic-tac-toe.service';

describe('TicTacToe Controller', () => {
  let controller: TicTacToeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicTacToeController],
      providers: [TicTacToeService]
    }).compile();

    controller = module.get<TicTacToeController>(TicTacToeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
