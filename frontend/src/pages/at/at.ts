import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-at',
  templateUrl: 'at.html',
})
export class AtPage {
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
