import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MoveDto } from './dto/move.dto';
import { TicTacToeService } from './tic-tac-toe.service';
import { Server } from 'socket.io';
import { TicTacToeDto } from './dto/tic-tac-toe.dto';

@WebSocketGateway(4002)
export class TicTacToeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server;
  
  constructor(private readonly ticTacToeService: TicTacToeService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('Connection - TicTacToe')

    const ticTacToeDto = new TicTacToeDto()
    ticTacToeDto.board = this.ticTacToeService.getBoard()
    ticTacToeDto.turn = this.ticTacToeService.getTurn()
    ticTacToeDto.winner = this.ticTacToeService.getWinner()
    this.server.emit('game-update', ticTacToeDto)
  }
  handleDisconnect(client: any) {
    console.log('Disconnection - TicTacToe')
  }

  updateGameState() {
    const ticTacToeDto = new TicTacToeDto()
    ticTacToeDto.board = this.ticTacToeService.getBoard()
    ticTacToeDto.turn = this.ticTacToeService.getTurn()
    ticTacToeDto.winner = this.ticTacToeService.getWinner()

    this.server.emit('game-update', ticTacToeDto)
  }

  @SubscribeMessage('move')
  async onMove(@MessageBody() move: MoveDto) {
    if (this.ticTacToeService.makeMove(move.player, move.row, move.column)) {
      this.updateGameState();      
    }
  }

  @SubscribeMessage('reset-game')
  async reset() {
    this.ticTacToeService.reset()
  }
}
