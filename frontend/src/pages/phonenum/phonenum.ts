import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangephonePage } from '../changephone/changephone';
import { SetPage } from '../set/set';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-phonenum',
  templateUrl: 'phonenum.html',
})
export class PhonenumPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }
  goChangePhone(){this.navCtrl.push(ChangephonePage);}
  goBack(){this.navCtrl.pop();}
  userID;//用户ID
  arr; //从后端返回的数据
  phoneStr; //手机号
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.http.post('/api/queryPhone',{id:this.userID}).subscribe(data=>{
      this.arr=data;
      this.phoneStr=this.arr[0].phoneNumber;
      this.phoneStr=this.phoneStr.substr(0,3)+"****"+this.phoneStr.substr(7);
    })
  }
}
