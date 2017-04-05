import { GameResult } from './game-result';
import { Tournament } from '../tournament/tournament';
export declare class Game {
    gamesResults: GameResult[];
    date: Date;
    description: string;
    buyinns: number;
    rebuys: number;
    valueTotal: number;
    tournamentId: number;
    tournament: Tournament;
    constructor(gamesResults: GameResult[]);
}
