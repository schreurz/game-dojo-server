import { Injectable } from '@nestjs/common';
import { TicTacToe } from './interfaces/tic-tac-toe.interface';

@Injectable()
export class TicTacToeService {
    private readonly board: string[][] = [['','',''],['','',''],['','','']]
    private turn: string = 'X'

    private setCell(val: string, row: number, column: number) {
        this.board[row][column] = val
    }

    private getCell(row: number, column: number): string {
        return this.board[row][column]
    }

    makeMove(player: string, row: number, column: number): boolean {
        if (this.turn === player
          && this.getCell(row, column) === '') {
            this.setCell(player, row, column)
            this.turn = this.turn == 'X' ? 'O' : 'X'
            return true;
        } else {
            return false;
        }
    }

    getBoard(): TicTacToe {
        return {board: this.board}
    }

    getWinner(): string {
        if (TicTacToeService.checkIfWon('X', this.board)) {
            return 'X'
        } else if (TicTacToeService.checkIfWon('Y', this.board)) {
            return 'Y'
        } else {
            return null
        }
    }

    getTurn() {
        return this.turn
    }

    static checkIfWon(player: string, board: string[][]): boolean {
        // check rows
        for (let i=0; i<3; i++) {
            if (board[i][0] === player
                && board[i][1] === player
                && board[i][2] === player) {
                    return true
                }
        }

        // check columns
        for (let i=0; i<3; i++) {
            if (board[0][i] === player
                && board[1][i] === player
                && board[2][i] === player) {
                return true
            }
        }

        if (board[0][0] === player
            && board[1][1] === player
            && board[2][2] === player) {
            return true
        } else if (board[0][2] === player
            && board[1][1] === player
            && board[2][0] === player) {
            return true
        }

        return false;
    }
}
