import { Http } from '@angular/http';
import { Game } from './../pages/games/game';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
export declare class GameService {
    http: Http;
    url: string;
    constructor(http: Http);
    getAll(): Observable<Game[]>;
    insertGame(game: Game): Observable<Game[]>;
    private handleError(error);
}
