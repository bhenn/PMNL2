import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

  @Injectable()
  export class PlayerService {

  	constructor(public http: Http) {
  		this.http = http;
  	}

  	getAll(){
  		return this.http.get('http://pmnlapidev.azurewebsites.net/api/players')
  			.map(res => res.json());
  	}

  }


