import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { api_config } from './../app/globals';
import 'rxjs/add/operator/map';
export var GameService = (function () {
    function GameService(http) {
        this.http = http;
        this.url = api_config.url + "/games";
        this.http = http;
    }
    GameService.prototype.getAll = function () {
        return this.http
            .get(this.url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GameService.prototype.insertGame = function (game) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http
            .post(this.url, game, options)
            .map(function (res) { return console.log(res); })
            .catch(this.handleError);
    };
    GameService.prototype.handleError = function (error) {
        return Observable.throw(error.status + " - " + error.statusText);
    };
    GameService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GameService.ctorParameters = [
        { type: Http, },
    ];
    return GameService;
}());
