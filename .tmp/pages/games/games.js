import { Component } from '@angular/core';
import { TournamentService } from '../../providers/tournament-service';
import { GameService } from '../../providers/game-service';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { GameInsert } from './game-insert';
export var GamesPage = (function () {
    function GamesPage(gameService, tournamentService, modalCtrl, loadingCtrl, navCtrl, alertCtrl) {
        this.gameService = gameService;
        this.tournamentService = tournamentService;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadGames();
    }
    GamesPage.prototype.loadGames = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Carregando"
        });
        loading.present();
        this.tournamentService.getAll()
            .subscribe(function (data) { _this.tournaments = data; loading.dismiss(); }, function (error) { _this.showError(error); loading.dismiss(); });
        loading.dismiss();
    };
    GamesPage.prototype.reload = function (refresher) {
        this.loadGames();
        refresher.complete();
    };
    GamesPage.prototype.openDetails = function (item) {
        this.navCtrl.push(GamesDetail, { item: item });
    };
    GamesPage.prototype.clickAlert = function () {
        this.showError('teste');
    };
    GamesPage.prototype.openInsert = function (tournament) {
        var modal = this.modalCtrl.create(GameInsert, { tournament: tournament });
        modal.present();
    };
    GamesPage.prototype.showError = function (error) {
        var alert = this.alertCtrl.create({
            title: "Erro",
            subTitle: error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    GamesPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-games',
                    templateUrl: 'games.html',
                    providers: [GameService, TournamentService]
                },] },
    ];
    /** @nocollapse */
    GamesPage.ctorParameters = [
        { type: GameService, },
        { type: TournamentService, },
        { type: ModalController, },
        { type: LoadingController, },
        { type: NavController, },
        { type: AlertController, },
    ];
    return GamesPage;
}());
export var GamesDetail = (function () {
    function GamesDetail(params) {
        this.item = params.data.item;
    }
    GamesDetail.decorators = [
        { type: Component, args: [{
                    templateUrl: 'games-detail.html'
                },] },
    ];
    /** @nocollapse */
    GamesDetail.ctorParameters = [
        { type: NavParams, },
    ];
    return GamesDetail;
}());
