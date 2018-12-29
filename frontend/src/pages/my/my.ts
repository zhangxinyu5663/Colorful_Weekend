import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetPage } from '../set/set';
import { CollectionPage } from '../collection/collection';
import { CreatePage } from '../create/create';
import { FansPage } from '../fans/fans';
import { GuanzhuPage } from '../guanzhu/guanzhu';
import { HttpClient } from '@angular/common/http';
import { AddPage } from '../add/add';
// SecurityContext 
@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }
  mine=[] ;
  ID;
  ionViewWillEnter(){
    this.ID=localStorage.getItem('id');
    this.http.post('/api/mine',{id:this.ID}).subscribe(data=>{
      this.mine=Array.prototype.slice.call(data); //将类数组对象转换为数组
    });
  }
  goCollection(){this.navCtrl.push(CollectionPage);}
  goGuanzhu(){this.navCtrl.push(GuanzhuPage);}
  goSet(){this.navCtrl.push(SetPage);}
  goCreate(){this.navCtrl.push(CreatePage )}
  goFans(){this.navCtrl.push(FansPage);}
}