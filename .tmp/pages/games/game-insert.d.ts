import { ViewController, ItemSliding, ToastController, LoadingController, AlertController, Loading, ModalController, NavParams, ActionSheetController } from 'ionic-angular';
import { Game } from './game';
import { Tournament } from '../tournament/tournament';
import { PlayerService } from '../../providers/player-service';
import { GameService } from '../../providers/game-service';
export declare class GameInsert {
    viewCtrl: ViewController;
    playerService: PlayerService;
    toastCtrl: ToastController;
    loadingCtrl: LoadingController;
    gameService: GameService;
    private alertCtrl;
    private modalCtrl;
    private actionSheetCtrl;
    tournament: Tournament;
    game: Game;
    buyInnValue: number;
    rebuyValue: number;
    loading: Loading;
    players: any[];
    playerRankingOriginal: any;
    pontuacao: number[][];
    constructor(viewCtrl: ViewController, playerService: PlayerService, toastCtrl: ToastController, loadingCtrl: LoadingController, gameService: GameService, alertCtrl: AlertController, modalCtrl: ModalController, actionSheetCtrl: ActionSheetController, params: NavParams);
    dismiss(): void;
    generatePreview(): void;
    getPoints(players: any, position: any): number;
    reorderItem(indexes: any): void;
    validateInsertGame(): void;
    insertGame(): void;
    removeItem(index: any, slidingItem: any): void;
    eliminate(player: any, fromIndex: any, slidingItem: ItemSliding): void;
    toast(message: string): void;
    showError(error: any): void;
    showLoading(onOff: boolean): void;
    validate(): boolean;
    preview(): void;
    moreOptions(playerAlter: any, slidingItem: ItemSliding): void;
}
export declare class GamePreview {
    viewCtrl: ViewController;
    players: any;
    constructor(viewCtrl: ViewController, params: NavParams);
    close(): void;
}
