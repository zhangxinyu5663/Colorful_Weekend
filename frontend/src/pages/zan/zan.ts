import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomeDetailPage } from '../homedetail/homedetail';

/**
 * Generated class for the ZanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zan',
  templateUrl: 'zan.html',
})
export class ZanPage {
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
  Myzan;//盛放我赞过的作品数组
  zanMy;//盛放赞过我的作品数组
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.http.post('/api/zan',{userID:this.userID}).subscribe(data=>{
        this.Myzan=data['Myzan'];
        this.zanMy=data['zanMy'];
        console.log(this.Myzan);
        
    })
  }
 
  detail(projectID){
    localStorage.setItem('homedetailID',projectID);
    this.navCtrl.push(HomeDetailPage);
  }
}
