import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FollowpersonPage } from '../followperson/followperson';
/**
 * Generated class for the GuanzhuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guanzhu',
  templateUrl: 'guanzhu.html',
})
export class GuanzhuPage {
  num;
  btn;
  flag=true;
  change(i){
    this.btn=document.getElementsByClassName('btn')[i];
    if(this.flag==true){
      this.num=i;
      document.getElementsByClassName('btn')[i].innerHTML = "关注";
      this.btn.style.backgroundColor="#fd273f";
    }else{
      this.btn.style.backgroundColor="grey";
      document.getElementsByClassName('btn')[i].innerHTML = "已关注";
    }
    this.flag=!this.flag;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gofollow(){
    this.navCtrl.push(FollowpersonPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuanzhuPage');
  }

}
