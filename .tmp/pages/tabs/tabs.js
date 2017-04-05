import { Component } from '@angular/core';
import { RankingPage } from '../ranking/ranking';
import { GamesPage } from '../games/games';
import { RulesPage } from '../rules/rules';
export var TabsPage = (function () {
    function TabsPage() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = RankingPage;
        this.tab2Root = GamesPage;
        this.tab3Root = RulesPage;
    }
    TabsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'tabs.html'
                },] },
    ];
    /** @nocollapse */
    TabsPage.ctorParameters = [];
    return TabsPage;
}());
