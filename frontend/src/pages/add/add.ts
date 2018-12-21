import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PicturePage } from '../picture/picture';
import { ReleaseonePage } from '../releaseone/releaseone';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AddPage');
  // }
  goSub(){
    this.navCtrl.push(ReleaseonePage);
  }
  userID; //用户ID
  myPublish=[];
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.http.post('/api/userPublish',{userID:this.userID}).subscribe(data=>{
      this.myPublish=Array.prototype.slice.call(data);
      console.log(this.myPublish);
    });
  }
}
