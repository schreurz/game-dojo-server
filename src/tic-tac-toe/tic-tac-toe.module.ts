import { Module } from '@nestjs/common';
import { TicTacToeController } from './tic-tac-toe.controller';
import { TicTacToeService } from './tic-tac-toe.service';
import { TicTacToeGateway } from './tic-tac-toe.gateway';

@Module({
    controllers: [TicTacToeController],
    providers: [TicTacToeService, TicTacToeGateway]
})
export class TicTacToeModule {}
