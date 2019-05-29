import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { HttpClient } from '@angular/common/http';
import { EditmyschedulePage } from '../editmyschedule/editmyschedule';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  isName:string="bus";
  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public http:HttpClient) {

  }
  year;
  userID;
  mySchedule=[];
  ionViewWillEnter(){
    // console.log(1111)
    this.year=new Date().getFullYear();
    this.userID=localStorage.getItem('id');
    console.log(this.userID);
    this.http.post('/api/mySchedule',{userID:this.userID}).subscribe(data=>{
      console.log(this.mySchedule);
      this.mySchedule=Array.prototype.slice.call(data); //将类数组对象转换为数组
      // this.mySchedule=data;
      console.log(this.mySchedule);
    });
  }
  goCalender(){
    this.navCtrl.push(CalendarPage);
  }

  edit(i){
    localStorage.setItem('userScheduleID',this.mySchedule[i].scheduleID);
    this.navCtrl.push(EditmyschedulePage);
  }

  li;
  delete(i){
    this.li=document.getElementsByClassName('li')[i];
    this.li.parentNode.removeChild(this.li);    
    
    this.http.post('/api/delmySchedule',{sID:this.mySchedule[i].scheduleID}).subscribe(data=>{
      if(data['status']==1){
        console.log('删除成功');
      }
    });
    
  }
  public typeTxt:any;

  /*选择select的value*/
  switchType() {
    console.log(this.typeTxt);
    this.http.post('/api/mySchedule/year',{userID:this.userID,typeTxt:this.typeTxt}).subscribe(data=>{
      this.mySchedule=Array.prototype.slice.call(data); 
    });
  }

}
