import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Content01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content01',
  templateUrl: 'content01.html',
})
export class Content01Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }isColor:boolean = true;
  
  close(){
    this.navCtrl.pop();
  }

  change(){
    this.isColor=!this.isColor;
    if (this.isColor == true) {
      document.getElementById('btn').innerText = "关注";
    }
    else {
        document.getElementById('btn').innerText = "已关注";
    }
  }

}
