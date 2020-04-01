import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MoveDto } from './dto/move.dto';
import { TicTacToeService } from './tic-tac-toe.service';
import { Server } from 'socket.io';

@WebSocketGateway(4002)
export class TicTacToeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly ticTacToeService: TicTacToeService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('connected')
    this.server.emit('board', {board: this.ticTacToeService.getBoard(), winner: this.ticTacToeService.getWinner()})
  }
  handleDisconnect(client: any) {
    console.log('disconnected')
  }

  @WebSocketServer() 
  server: Server;

  @SubscribeMessage('move')
  async onMove(@MessageBody() move: MoveDto) {
    if (this.ticTacToeService.makeMove(move.player, move.row, move.column)) {
       this.server.emit('board', {board: this.ticTacToeService.getBoard(), winner: this.ticTacToeService.getWinner()})
    }
  }
}
