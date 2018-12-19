import { Component, style } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../my/my';
import { FansmyPage } from '../fansmy/fansmy';

@IonicPage()
@Component({
  selector: 'page-fans',
  templateUrl: 'fans.html',
})
export class FansPage {
  num;
  btn;
  flag=true;
  change(i){
    this.btn=document.getElementsByClassName('btn')[i];
    if(this.flag==true){
      this.num=i;
      document.getElementsByClassName('btn')[i].innerHTML = "已关注";
      this.btn.style.backgroundColor="grey";
    }else{
      this.btn.style.backgroundColor="#fd273f";
      document.getElementsByClassName('btn')[i].innerHTML = "关注";
    }
    this.flag=!this.flag;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goMy(){this.navCtrl.pop();}
  goFan(){this.navCtrl.push(FansmyPage);}
}
