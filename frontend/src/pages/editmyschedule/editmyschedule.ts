import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the EditmyschedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editmyschedule',
  templateUrl: 'editmyschedule.html',
})
export class EditmyschedulePage {
// event:string='briefcase';
public typeTxt:any;
detail;
myDate;
year;
date;
back;
sID;
schedule=[];

ionViewWillEnter(){
  localStorage.removeItem('searchTheme');
  localStorage.removeItem('userID');
  this.sID=localStorage.getItem('userScheduleID');
  this.http.post('/api/specific/userSchedule',{sID:this.sID}).subscribe(data=>{
    this.schedule=Array.prototype.slice.call(data);
    this.myDate=this.schedule[0].date;
    this.detail=this.schedule[0].detail;
    this.typeTxt=this.schedule[0].type;
  });
}

close(){
  this.navCtrl.pop();
}
switchType() {
  console.log(this.typeTxt);
}

constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
}

userID;  //用户ID
save(){
  this.userID=localStorage.getItem('id');
  this.http.post('/api/update/userSchedule',{type:this.typeTxt,date:this.myDate,detail:this.detail,userID:this.userID,sID:this.sID}).subscribe(data=>{
    if(data['status']==1){
      console.log('修改成功');
      this.navCtrl.pop();
    }
  })
}

}
