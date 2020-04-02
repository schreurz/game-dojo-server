import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
// import { vs as uuidv4 } from 'uuid';

@WebSocketGateway(4001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() 
  server: Server;

  users: number = 0

  async handleConnection() {
    this.users++

    console.log('Connection - Chat')

    this.server.emit('users', this.users)
  }

  async handleDisconnect() {
    this.users--

    console.log('Disconnection - Chat')

    this.server.emit('users', this.users)
  }

  @SubscribeMessage('chat')
  async onChat(@MessageBody() message: string){
    console.log(message)
    this.server.emit('chat', message)
  }
}
