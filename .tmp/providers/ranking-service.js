import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { api_config } from './../app/globals';
import 'rxjs/add/operator/map';
export var RankingService = (function () {
    function RankingService(http) {
        this.http = http;
        this.url = api_config.url + "/ranking";
        this.http = http;
    }
    RankingService.prototype.getAll = function () {
        return this.http.get(this.url)
            .map(function (res) { return res.json(); });
    };
    RankingService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RankingService.ctorParameters = [
        { type: Http, },
    ];
    return RankingService;
}());
