import { Injectable } from '@nestjs/common';

const WELCOME_MESSAGE: string = 'Welcome to Zack\'s Game Dojo!'

@Injectable()
export class AppService {
  getHello(): string {
    return WELCOME_MESSAGE;
  }
}
