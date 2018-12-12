import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ZanPage } from '../zan/zan';
import { AtPage } from '../at/at';
// import {  }
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  items=[];
  list="privateletter";
  constructor(public navCtrl: NavController) {}
  setlist(str){
    this.list=str;
    console.log(this.list);
  }
  gozan(){
    this.navCtrl.push(ZanPage);
  }
  goat(){
    this.navCtrl.push(AtPage);
  }
  

}
