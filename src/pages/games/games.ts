import { Component } from '@angular/core';
import { GameService } from '../../providers/game-service';
import { ViewController, NavController, ModalController, NavParams, LoadingController , AlertController} from 'ionic-angular';
import { GameInsert } from './game-insert';

@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
  providers: [GameService]
})
export class GamesPage {

  games;
  
  constructor(public gameService: GameService, 
              public modalCtrl:ModalController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              private alertCtrl: AlertController) {

  
    this.loadGames();
  }  

  loadGames(){

    let loading = this.loadingCtrl.create({
      content: "Carregando"
    })

    loading.present();

    this.gameService.getAll()
      .subscribe(
          data => {this.games = data; loading.dismiss()},
          error => {this.showError(error); loading.dismiss()}
      );

  }

  reload(refresher){
    this.loadGames();
    refresher.complete();
  }

  openDetails(item){
  	this.navCtrl.push(GamesDetail,{item: item});
  }

  openInsert(){
    let modal = this.modalCtrl.create(GameInsert);
    modal.present();
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


@Component({
	templateUrl: 'games-detail.html'
})

export class GamesDetail{
	item;

	constructor(params: NavParams){
		this.item = params.data.item;
	}

}
