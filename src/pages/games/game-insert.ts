import { Component } from '@angular/core';
import { PlayerService } from '../../providers/player-service';
import { GameService } from '../../providers/game-service';
import { ViewController, reorderArray, ItemSliding, ToastController , LoadingController, AlertController} from 'ionic-angular';
import { Game } from './game';
import { GameResult } from './game-result';
import _ from "lodash";


@Component({
  templateUrl: 'game-insert.html',
  providers: [PlayerService, GameService]
})

export class GameInsert{

  game: Game;

  players;
  playerRankingOriginal;

  pontuacao = [
  /*5*/ [11,7,4,2,1], 
  /*6*/ [14,9,6,4,2,1],
  /*7*/ [17,11,8,5,3,2,1],
  /*8*/ [19,13,9,6,4,3,2,1],
  /*9*/ [21,15,10,7,5,4,3,2,1],
  /*10*/[23,16,11,8,6,5,4,3,2,1],
  /*11*/[24,17,12,9,7,6,5,4,3,2,1],
  /*12*/[25,18,13,10,8,7,6,5,4,3,2,1]
  ]
  
  constructor(public viewCtrl: ViewController,
              public playerService: PlayerService, 
              public toastCtrl: ToastController, 
              public loadingCtrl: LoadingController, 
              public gameService: GameService,
              private alertCtrl: AlertController) {

    this.game = new Game(new Array<GameResult>());
    this.loadPlayers();
  }

  loadPlayers(){
    this.playerService.getAll()
    .subscribe(data => {
      this.players = data;
      this.playerRankingOriginal = _.cloneDeep(this.players);    
      this.generatePreview();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  generatePreview(){
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].pointsPreview = this.getPoints(this.players.length, i);
      this.players[i].pointsFinal = this.players[i].pointsPreview + this.players[i].points;
    };
  }

  getPoints(players, position){
    return this.pontuacao[players - 5][position];
  }

  reorderItem(indexes){
    console.log(indexes);
    this.players = reorderArray(this.players,indexes);
    this.generatePreview();
  }

  insertGame(){
    // let gameResults: GameResult = [];
    for (var i = 0; i < this.players.length; i++) {
      // this.game. gameResult.push({playerId: this.players[i].id, order: i+1});
      this.game.gameResults.push({playerId: this.players[i].id, order: i+1})
    }
    console.log(this.game);

    this.gameService.insertGame(this.game)
      .subscribe(
        data => this.viewCtrl.dismiss(),
        error => this.showError(error)
      );

    // this.gameService.insertGame(game)
    // .subscribe(
    //   data => this.viewCtrl.dismiss(),
    //   error => this.showError(error)
    //   );


    // this.gameService.insert(game)
    // this.gameService
    //     .insertGame(game)
    //     .subscribe(
    //       data => {this.viewCtrl.dismiss()},
    //       error => {this.show}
    //     )

    
    // this.viewCtrl.dismiss();
    
  }
  removeItem(index,slidingItem){
    if (this.players.length == 5){
      this.toast("O mínimo de jogadores é 5");
    }else{
      this.players.splice(index, 1)  
    }
  }

  eliminate(player,fromIndex,slidingItem: ItemSliding){
    let lastEliminated = null;
    let indexTo = 0;

    if (player.eliminado)
    {
      indexTo = 0;
    }else{
      for (var i = this.players.length - 1; i >= 0; i--) {
        if (this.players[i].eliminado == true){
          lastEliminated = i;
        }
      }

      if (lastEliminated != null){
        indexTo = lastEliminated - 1;
      }else{
        indexTo = this.players.length - 1;
      }  
    }
    
    var indexes = {
      from: fromIndex,
      to: indexTo
    }


    this.reorderItem(indexes);
    player.eliminado = !player.eliminado;

    slidingItem.close();

  }

  toast(message: string){

    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  show(){
    let loading = this.loadingCtrl.create({
      content: "Teste",
      duration: 2000
    })

    loading.present();
  }

  showError(error){
    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: error,
      buttons: ['Dismiss']
    })

    alert.present();

  }

}
