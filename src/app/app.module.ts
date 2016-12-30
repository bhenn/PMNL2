import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { GamesPage, GamesDetail } from '../pages/games/games';
import { GameInsert } from '../pages/games/game-insert';
import { RulesPage } from '../pages/rules/rules';
import { RankingPage } from '../pages/ranking/ranking';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    GamesPage,
    GamesDetail,
    RulesPage,
    RankingPage,
    TabsPage,
    GameInsert
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesPage,
    GamesDetail,
    RulesPage,
    RankingPage,
    TabsPage,
    GameInsert
  ],
  providers: []
})
export class AppModule {}
