import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { api_config } from './../app/globals';
import 'rxjs/add/operator/map';
export var TournamentService = (function () {
    function TournamentService(http) {
        this.http = http;
        this.url = api_config.url + "/tournaments";
        this.http = http;
    }
    TournamentService.prototype.getAll = function () {
        return this.http
            .get(this.url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TournamentService.prototype.handleError = function (error) {
        return Observable.throw(error.status + " - " + error.statusText);
    };
    TournamentService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TournamentService.ctorParameters = [
        { type: Http, },
    ];
    return TournamentService;
}());
