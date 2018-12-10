import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollectionPage } from '../collection/collection';
import { FansPage } from '../fans/fans';
import { SetPage } from '../set/set';
import { CreatePage } from '../create/create';

/**
 * Generated class for the FansmyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fansmy',
  templateUrl: 'fansmy.html',
})
export class FansmyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  gofans(){
    this.navCtrl.popTo(FansPage);
  }

}
