import { TournamentService } from '../../providers/tournament-service';
import { GameService } from '../../providers/game-service';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Tournament } from '../tournament/tournament';
export declare class GamesPage {
    gameService: GameService;
    tournamentService: TournamentService;
    modalCtrl: ModalController;
    loadingCtrl: LoadingController;
    navCtrl: NavController;
    private alertCtrl;
    tournaments: Tournament[];
    constructor(gameService: GameService, tournamentService: TournamentService, modalCtrl: ModalController, loadingCtrl: LoadingController, navCtrl: NavController, alertCtrl: AlertController);
    loadGames(): void;
    reload(refresher: any): void;
    openDetails(item: any): void;
    clickAlert(): void;
    openInsert(tournament: Tournament): void;
    showError(error: any): void;
}
export declare class GamesDetail {
    item: any;
    constructor(params: NavParams);
}
