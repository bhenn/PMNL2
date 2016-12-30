import { Component } from '@angular/core';
import { PlayerService } from '../../providers/player-service';
import { NavController , LoadingController , AlertController} from 'ionic-angular';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  providers: [PlayerService]
})
export class RankingPage {

  players;

  constructor(public navCtrl: NavController, 
    public playerService: PlayerService, 
    public loadinCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.loadPlayers();
  }

  loadPlayers(){
    let loading = this.loadinCtrl.create({
      content: "Carregando"
    })

    loading.present();

    this.playerService.getAll()
    .subscribe(
      data => {
        this.players = data;
        loading.dismiss();
      },
      error => this.showError(error)
      );
  }

  reload(refresher){
    this.loadPlayers();
    refresher.complete();
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
