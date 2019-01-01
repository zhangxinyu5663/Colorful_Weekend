import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the PlanonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planone',
  templateUrl: 'planone.html',
})
export class PlanonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }

  hsID; //首页日程推荐详情ID
  schedule=[];
  detailone;
  detailtwo;
  ionViewWillEnter(){
    this.hsID=localStorage.getItem('hsID');
    this.http.post('/api/homeScheduleDetail',{hsID:this.hsID}).subscribe(data=>{
      this.schedule=Array.prototype.slice.call(data);
      this.detailone=this.schedule[0].detail.split('|');
      this.detailtwo=this.schedule[1].detail.split('|');
      for(var i=0;i<this.detailone.length;i++){
        if(this.detailone[i]==""){
          this.detailone.splice(i,1);
          i=i-1;
        }
      }
      for(var i=0;i<this.detailtwo.length;i++){
        if(this.detailtwo[i]==""){
          this.detailtwo.splice(i,1);
          i=i-1;
        }
      }
    });
  }
  goBack(){
    this.navCtrl.pop();
  }

}
