import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
})
export class UserdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  userDetail=[];
  userID;
  ionViewDidLoad() {
    this.userID=localStorage.getItem("userdetailID");
    this.http.post('/api/check',{id:this.userID}).subscribe(data=>{
      this.userDetail=Array.prototype.slice.call(data); 
      // console.log(this.userDetail[0].userName);
    });
  }

  back(){
    this.navCtrl.pop();
  }
}
