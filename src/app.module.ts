import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { ChatModule } from './chat/chat.module';
import { TicTacToeGateway } from './tic-tac-toe/tic-tac-toe.gateway';

@Module({
  imports: [TicTacToeModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
