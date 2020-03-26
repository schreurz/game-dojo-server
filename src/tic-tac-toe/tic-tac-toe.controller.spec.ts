import { Test, TestingModule } from '@nestjs/testing';
import { TicTacToeController } from './tic-tac-toe.controller';

describe('TicTacToe Controller', () => {
  let controller: TicTacToeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicTacToeController],
    }).compile();

    controller = module.get<TicTacToeController>(TicTacToeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
