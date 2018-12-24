import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../my/my';
import { HttpClient } from '@angular/common/http';
import { Content01Page } from '../content01/content01';

@IonicPage()
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  goMy(){this.navCtrl.push(MyPage);}
  userID;//用于标记是哪个用户
  Mycollect;//盛放我赞过的作品数组
  ionViewDidLoad(){
    this.userID=localStorage.getItem('userID');
    this.http.post('/api/my/collect',{userID:this.userID}).subscribe(data=>{
        this.Mycollect=data['Mycollect'];
        console.log(this.Mycollect);
        
    })
  }
 
  detail(projectID){
    localStorage.setItem('homedetailID',projectID);
    this.navCtrl.push(Content01Page);
  }
}
