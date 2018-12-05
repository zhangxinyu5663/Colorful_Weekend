import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ZanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zan',
  templateUrl: 'zan.html',
})
export class ZanPage {
  close(){
    this.navCtrl.pop();
  }

  isActive=0;
  isClick(i){
    this.isActive=i;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  good:string="a";
}
