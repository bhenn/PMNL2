import { Game } from '../games/game';
import { TournamentPlayers } from './tournamentPlayers';
export declare class Tournament {
    constructor();
    id: number;
    description: string;
    games: Array<Game>;
    tournamentPlayers: Array<TournamentPlayers>;
}
