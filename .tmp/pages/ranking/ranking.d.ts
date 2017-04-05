import { RankingService } from '../../providers/ranking-service';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Tournament } from '../tournament/tournament';
export declare class RankingPage {
    navCtrl: NavController;
    rankingService: RankingService;
    loadinCtrl: LoadingController;
    private alertCtrl;
    tournaments: Array<Tournament>;
    constructor(navCtrl: NavController, rankingService: RankingService, loadinCtrl: LoadingController, alertCtrl: AlertController);
    loadPlayers(): void;
    reload(refresher: any): void;
    showError(error: any): void;
}
