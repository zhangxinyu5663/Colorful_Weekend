import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../my/my';

@IonicPage()
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goMy(){this.navCtrl.push(MyPage);}
  // num;
  // btn;
  // flag=true;
  // change(i){
  //   this.btn=document.getElementsByClassName('btn')[i];
  //   if(this.flag==true){
  //     this.num=i;
  //     this.btn.style.color="aliceblue";
  //   }else{
  //     this.btn.style.color="yel";
  //   }
  //   this.flag=!this.flag;
  // }
}
