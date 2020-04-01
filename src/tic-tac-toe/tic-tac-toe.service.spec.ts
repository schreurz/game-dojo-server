import { Test, TestingModule } from '@nestjs/testing';
import { TicTacToeService } from './tic-tac-toe.service';

describe('TicTacToeService', () => {
  let service: TicTacToeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicTacToeService],
    }).compile();

    service = module.get<TicTacToeService>(TicTacToeService);
  });

  describe('Gameplay', () => {
    test('foo', () => {
      expect(service.getTurn()).toBe('X')
      expect(service.makeMove('X', 0, 0))
      expect(service.getWinner()).toBeNull()

      expect(service.getTurn()).toBe('O')
      expect(service.makeMove('O', 1, 0))
      expect(service.getWinner()).toBeNull()

      expect(service.getTurn()).toBe('X')
      expect(service.makeMove('X', 0, 1))
      expect(service.getWinner()).toBeNull()

      expect(service.getTurn()).toBe('O')
      expect(service.makeMove('O', 1, 1))
      expect(service.getWinner()).toBeNull()

      expect(service.getTurn()).toBe('X')
      expect(service.makeMove('X', 0, 2))
      expect(service.getWinner()).toBe('X')
    })
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set an empty board', () => {
    expect(service.getBoard()).toEqual([['','',''],['','',''],['','','']])
  })

  it('should start with winner equal to null', () => {
    expect(service.getWinner()).toEqual(null)
  })

  it('should set cells with euclidian coordinates', () => {
    service.makeMove('X', 2, 1);
    service.makeMove('O', 0, 2)
    expect(service.getBoard()).toEqual([['','','O'],['','',''],['','X','']])
  })

  it('does not allow two turns in a row', () => {
    service.makeMove('X', 0, 0)
    expect(service.makeMove('X', 0, 1)).toBeFalsy()
  })

  it('returns true on successful move', () => {
    expect(service.makeMove('X', 1, 0)).toBeTruthy()
  })

  it('returns false when making a move in filled cel', () => {
    service.makeMove('X', 1, 0)
    expect(service.makeMove('O', 1, 0)).toBeFalsy()
  })

  it('returns false when making a move on other players turn', () => {
    service.makeMove('X', 1, 0)
    expect(service.makeMove('X', 0, 0)).toBeFalsy()
  })

  test('turn alternates between \'X\' & \'O\'', () => {
    expect(service.getTurn()).toEqual('X')
    service.makeMove('X', 0, 0)
    expect(service.getTurn()).toEqual('O')
    service.makeMove('O', 1, 0)
    expect(service.getTurn()).toEqual('X')
    service.makeMove('X', 2, 0)
    expect(service.getTurn()).toEqual('O')
  })

  describe('checkIfWon', () => {
    const horizontalWin = [['X','X','X'],['','',''],['','','']]
    const verticalWin = [['','O',''],['','O',''],['','O','']]
    const diagonalWin1 = [['O','',''],['','O',''],['','','O']]
    const diagonalWin2 = [['','','O'],['','O',''],['O','','']]
    const winWithNoise = [['O','O','X'],['X','O','X'],['O','X','O']]

    test('horizontal', () => {
      expect(TicTacToeService.checkIfWon('X', horizontalWin)).toBeTruthy()
    })

    test('vertical', () => {
      expect(TicTacToeService.checkIfWon('O', verticalWin)).toBeTruthy()
    })

    test('diagonal1', () => {
      expect(TicTacToeService.checkIfWon('O', diagonalWin1)).toBeTruthy()
    })

    test('diagonal2', () => {
      expect(TicTacToeService.checkIfWon('O', diagonalWin2)).toBeTruthy()
    })

    test('noise', () => {
      expect(TicTacToeService.checkIfWon('O', winWithNoise)).toBeTruthy()
    })
  })
});
