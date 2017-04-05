import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { GamesPage, GamesDetail } from '../pages/games/games';
import { GameInsert, GamePreview } from '../pages/games/game-insert';
import { RulesPage } from '../pages/rules/rules';
import { RankingPage } from '../pages/ranking/ranking';
import { TabsPage } from '../pages/tabs/tabs';
import { MomentModule } from 'angular2-moment';
import 'moment/src/locale/pt-br';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyApp,
                        GamesPage,
                        GamesDetail,
                        RulesPage,
                        RankingPage,
                        TabsPage,
                        GameInsert,
                        GamePreview
                    ],
                    imports: [
                        IonicModule.forRoot(MyApp),
                        MomentModule
                    ],
                    bootstrap: [IonicApp],
                    entryComponents: [
                        MyApp,
                        GamesPage,
                        GamesDetail,
                        RulesPage,
                        RankingPage,
                        TabsPage,
                        GameInsert,
                        GamePreview
                    ],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
