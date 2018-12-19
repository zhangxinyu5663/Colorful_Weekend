import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetPage } from '../set/set';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:HttpClient) {
  }
  userID;  //用户ID
  back=[];  //从后端返回的数据
  ionViewDidLoad(){
    this.userID=localStorage.getItem('id');
    this.http.post('/api/queryHead',{id:this.userID}).subscribe(data=>{
      this.back=Array.prototype.slice.call(data);
      console.log(this.back[0].head);
    });
  }
  goBack(){this.navCtrl.pop();}
  
}
