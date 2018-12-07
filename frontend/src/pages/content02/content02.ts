import { Component } from '@angular/core';
import {  NavController, NavParams ,ModalController} from 'ionic-angular';
// import { isComponentView } from '@angular/core/src/view/util';

/**
 * Generated class for the Content02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-content02',
  templateUrl: 'content02.html',
})
export class Content02Page {
  isColor:boolean = true;
  
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

  constructor(public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  

}