import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Game } from './../pages/games/Game';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

  @Injectable()
  export class GameService {

    url = "http://pmnlapidev.azurewebsites.net/api/games";

  	constructor(public http: Http) {
  		this.http = http;
  	}


    getAll(): Observable<Game[]> {
      return this.http
                 .get(this.url)
                 .map(res => res.json())
                 .catch(this.handleError);

    }


    insertGame(game: Game): Observable<Game[]>{
      return this.http
                  .post(this.url, Game)
                  .map(res => res.json())
                  .catch(this.handleError);

    }

    private handleError(error){
      console.error(error);
      return Observable.throw(error.json().error || "server error");
    }


  }


