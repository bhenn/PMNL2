import { Http } from '@angular/http';
import { Tournament } from '../pages/tournament/tournament';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
export declare class RankingService {
    http: Http;
    url: string;
    constructor(http: Http);
    getAll(): Observable<Tournament[]>;
}
