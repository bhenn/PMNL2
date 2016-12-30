import { GameResult } from './game-result';

export class Game{
	date: Date;
	description: string;


	constructor(public gameResults: GameResult[]){
	}
}