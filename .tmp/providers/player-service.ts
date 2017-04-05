import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { api_config } from './../app/globals';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

  @Injectable()
  export class PlayerService {


    url = api_config.url + "/players";

  	constructor(public http: Http) {
  		this.http = http;
  	}

  	getAll(): Observable<any>{
  		return this.http.get(this.url)
  			.map(res => res.json());
  	}

  }


