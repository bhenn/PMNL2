import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var RulesPage = (function () {
    function RulesPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    RulesPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-rules',
                    templateUrl: 'rules.html'
                },] },
    ];
    /** @nocollapse */
    RulesPage.ctorParameters = [
        { type: NavController, },
    ];
    return RulesPage;
}());
