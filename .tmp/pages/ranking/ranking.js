import { Component } from '@angular/core';
import { RankingService } from '../../providers/ranking-service';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
export var RankingPage = (function () {
    function RankingPage(navCtrl, rankingService, loadinCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.rankingService = rankingService;
        this.loadinCtrl = loadinCtrl;
        this.alertCtrl = alertCtrl;
        this.loadPlayers();
    }
    RankingPage.prototype.loadPlayers = function () {
        var _this = this;
        var loading = this.loadinCtrl.create({
            content: "Carregando"
        });
        loading.present();
        this.rankingService.getAll()
            .subscribe(function (data) {
            _this.tournaments = data;
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            _this.showError(error);
        });
    };
    RankingPage.prototype.reload = function (refresher) {
        this.loadPlayers();
        refresher.complete();
    };
    RankingPage.prototype.showError = function (error) {
        var alert = this.alertCtrl.create({
            title: "Erro",
            subTitle: error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    RankingPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-ranking',
                    templateUrl: 'ranking.html',
                    providers: [RankingService]
                },] },
    ];
    /** @nocollapse */
    RankingPage.ctorParameters = [
        { type: NavController, },
        { type: RankingService, },
        { type: LoadingController, },
        { type: AlertController, },
    ];
    return RankingPage;
}());
