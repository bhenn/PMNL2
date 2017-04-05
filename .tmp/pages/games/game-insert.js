import { Component } from '@angular/core';
import { ViewController, reorderArray, ToastController, LoadingController, AlertController, ModalController, NavParams, ActionSheetController } from 'ionic-angular';
import { Game } from './game';
import { GameResult } from './game-result';
import { PlayerService } from '../../providers/player-service';
import { GameService } from '../../providers/game-service';
export var GameInsert = (function () {
    function GameInsert(viewCtrl, playerService, toastCtrl, loadingCtrl, gameService, alertCtrl, modalCtrl, actionSheetCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.playerService = playerService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.gameService = gameService;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.players = [];
        this.pontuacao = [
            /*5*/ [11, 7, 4, 2, 1],
            /*6*/ [14, 9, 6, 4, 2, 1],
            /*7*/ [17, 11, 8, 5, 3, 2, 1],
            /*8*/ [19, 13, 9, 6, 4, 3, 2, 1],
            /*9*/ [21, 15, 10, 7, 5, 4, 3, 2, 1],
            /*10*/ [23, 16, 11, 8, 6, 5, 4, 3, 2, 1],
            /*11*/ [24, 17, 12, 9, 7, 6, 5, 4, 3, 2, 1],
            /*12*/ [25, 18, 13, 10, 8, 7, 6, 5, 4, 3, 2, 1]
        ];
        this.game = new Game(new Array());
        this.tournament = params.get('tournament');
        // this.game.date = new Date();
        this.game.valueTotal = 0;
        this.game.rebuys = 0;
        this.buyInnValue = 30;
        this.rebuyValue = 15;
        this.game.tournamentId = this.tournament.id;
        this.players = this.tournament.tournamentPlayers;
        this.generatePreview();
    }
    GameInsert.prototype.dismiss = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cancelar',
            message: 'Deseja realmente cancelar ?',
            buttons: [
                {
                    text: 'Sim',
                    role: 'cancel',
                    handler: function () {
                        _this.viewCtrl.dismiss();
                    }
                },
                {
                    text: 'Não'
                }
            ]
        });
        alert.present();
    };
    GameInsert.prototype.generatePreview = function () {
        this.game.buyinns = this.players.length;
        this.game.valueTotal = (this.game.buyinns * this.buyInnValue) + (this.game.rebuys * this.rebuyValue);
        var prizeTotal = this.game.valueTotal;
        var prizeFirst = 0;
        var prizeSecond = 0;
        var prizeThird = 0;
        var prizeTrophy = 0;
        prizeTrophy = this.buyInnValue;
        if (this.players.length > 8) {
        }
        else {
            prizeThird = 0;
            prizeSecond = this.buyInnValue;
            prizeFirst = prizeTotal - (prizeThird + prizeSecond + prizeTrophy);
        }
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].pointsPreview = this.getPoints(this.players.length, i);
            this.players[i].pointsFinal = this.players[i].pointsPreview + this.players[i].points;
            if (i + 1 == 1) {
                this.players[i].prize = prizeFirst;
            }
            else if (i + 1 == 2) {
                this.players[i].prize = prizeSecond;
            }
            else if (i + 1 == 3) {
                this.players[i].prize = prizeThird;
            }
            else {
                this.players[i].prize = 0;
            }
        }
        ;
    };
    GameInsert.prototype.getPoints = function (players, position) {
        return this.pontuacao[players - 5][position];
    };
    GameInsert.prototype.reorderItem = function (indexes) {
        this.players = reorderArray(this.players, indexes);
        this.generatePreview();
    };
    GameInsert.prototype.validateInsertGame = function () {
        var _this = this;
        var alertPassword = this.alertCtrl.create({
            title: "Senha",
            inputs: [{
                    name: "Senha",
                    placeholder: "senha",
                    type: 'password'
                }],
            buttons: [{
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                    }
                }, {
                    text: 'Ok',
                    handler: function (data) {
                        console.log(data.Senha == 'pmnl001');
                        if (data.Senha == 'pmnl001') {
                            _this.insertGame();
                        }
                    }
                }]
        });
        alertPassword.present();
    };
    GameInsert.prototype.insertGame = function () {
        var _this = this;
        if (this.validate()) {
            this.showLoading(true);
            for (var i = 0; i < this.players.length; i++) {
                var gameResult = new GameResult();
                gameResult.tournamentPlayerId = this.players[i].id;
                gameResult.order = i + 1;
                gameResult.rebuys = this.players[i].rebuys;
                this.game.gamesResults.push(gameResult);
            }
            // console.log(this.game);
            this.gameService.insertGame(this.game)
                .subscribe(function (data) { _this.showLoading(false); _this.viewCtrl.dismiss(); }, function (error) { return _this.showError(error); });
        }
    };
    GameInsert.prototype.removeItem = function (index, slidingItem) {
        if (this.players.length == 5) {
            this.toast("O mínimo de jogadores é 5");
        }
        else {
            if (!isNaN(this.players[index].rebuys)) {
                this.game.rebuys -= this.players[index].rebuys;
            }
            this.players.splice(index, 1);
        }
        this.generatePreview();
    };
    GameInsert.prototype.eliminate = function (player, fromIndex, slidingItem) {
        var lastEliminated = null;
        var indexTo = 0;
        if (player.eliminado) {
            indexTo = 0;
        }
        else {
            for (var i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].eliminado == true) {
                    lastEliminated = i;
                }
            }
            if (lastEliminated != null) {
                indexTo = lastEliminated - 1;
            }
            else {
                indexTo = this.players.length - 1;
            }
        }
        var indexes = {
            from: fromIndex,
            to: indexTo
        };
        this.reorderItem(indexes);
        player.eliminado = !player.eliminado;
        slidingItem.close();
    };
    GameInsert.prototype.toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    GameInsert.prototype.showError = function (error) {
        var alert = this.alertCtrl.create({
            title: "Erro",
            subTitle: error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    GameInsert.prototype.showLoading = function (onOff) {
        if (onOff) {
            this.loading = this.loadingCtrl.create({
                content: "Carregando"
            });
            this.loading.present();
        }
        else {
            this.loading.dismiss();
        }
    };
    GameInsert.prototype.validate = function () {
        if (this.game.description == "" || this.game.description == undefined) {
            this.toast("Preencha a descrição");
            return false;
        }
        return true;
    };
    GameInsert.prototype.preview = function () {
        var previewModal = this.modalCtrl.create(GamePreview, { playersPreview: this.players });
        previewModal.present();
    };
    GameInsert.prototype.moreOptions = function (playerAlter, slidingItem) {
        var _this = this;
        var action = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Rebuy',
                    handler: function () {
                        if (isNaN(playerAlter.rebuys)) {
                            playerAlter.rebuys = 0;
                        }
                        playerAlter.rebuys++;
                        _this.game.rebuys++;
                        _this.generatePreview();
                    }
                },
                {
                    text: 'Cancela',
                    role: 'cancel'
                }
            ]
        });
        action.present();
        slidingItem.close();
    };
    GameInsert.decorators = [
        { type: Component, args: [{
                    templateUrl: 'game-insert.html',
                    providers: [PlayerService, GameService]
                },] },
    ];
    /** @nocollapse */
    GameInsert.ctorParameters = [
        { type: ViewController, },
        { type: PlayerService, },
        { type: ToastController, },
        { type: LoadingController, },
        { type: GameService, },
        { type: AlertController, },
        { type: ModalController, },
        { type: ActionSheetController, },
        { type: NavParams, },
    ];
    return GameInsert;
}());
export var GamePreview = (function () {
    function GamePreview(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.players = params.get('playersPreview');
    }
    GamePreview.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    GamePreview.decorators = [
        { type: Component, args: [{
                    templateUrl: 'game-preview.html'
                },] },
    ];
    /** @nocollapse */
    GamePreview.ctorParameters = [
        { type: ViewController, },
        { type: NavParams, },
    ];
    return GamePreview;
}());
