import { Component, SecurityContext } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetPage } from '../set/set';
import { CollectionPage } from '../collection/collection';
import { CreatePage } from '../create/create';
import { FansPage } from '../fans/fans';

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goCollection(){this.navCtrl.push(CollectionPage);}
  goSet(){this.navCtrl.push(SetPage);}
  goCreate(){this.navCtrl.push(CreatePage);}
  goFans(){this.navCtrl.push(FansPage);}
}