import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Content04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content04',
  templateUrl: 'content04.html',
})
export class Content04Page {

  isColor:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
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
