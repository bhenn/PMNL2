import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { api_config } from './../app/globals';
import 'rxjs/add/operator/map';
export var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
        this.url = api_config.url + "/players";
        this.http = http;
    }
    PlayerService.prototype.getAll = function () {
        return this.http.get(this.url)
            .map(function (res) { return res.json(); });
    };
    PlayerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PlayerService.ctorParameters = [
        { type: Http, },
    ];
    return PlayerService;
}());
