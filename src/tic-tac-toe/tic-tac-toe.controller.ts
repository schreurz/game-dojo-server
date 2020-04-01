import { Controller, Get, Post } from '@nestjs/common';
import { TicTacToeService } from './tic-tac-toe.service';
import { TicTacToeDto } from './dto/tic-tac-toe.dto';

@Controller('tic-tac-toe')
export class TicTacToeController {}
