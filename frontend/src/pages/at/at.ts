import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-at',
  templateUrl: 'at.html',
})
export class AtPage {
  close(){
    this.navCtrl.pop();
  }

  isActive=0;
  isClick(i){
    this.isActive=i;
  }
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  userID;//用于标记是哪个用户
  Mycomment;//盛放我赞过的作品数组
  commentMy;//盛放赞过我的作品数组
  ionViewDidLoad(){
    this.userID=localStorage.getItem('id');
    // {userID:this.userID}
    this.http.post('/api/comment',{userID:this.userID}).subscribe(data=>{
        this.Mycomment=data['commentMy'];
        this.commentMy=data['Mycomment'];
        console.log(this.Mycomment);
        
    })
  }
  good:string="a";

}
