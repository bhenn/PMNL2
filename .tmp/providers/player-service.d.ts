import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
export declare class PlayerService {
    http: Http;
    url: string;
    constructor(http: Http);
    getAll(): Observable<any>;
}
