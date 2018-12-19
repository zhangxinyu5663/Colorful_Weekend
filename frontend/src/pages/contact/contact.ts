import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  isName:string="bus";
  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public http:HttpClient) {

  }
  ID;
  mySchedule=[];
  year=[];
  ionViewWillEnter(){
    console.log(1111)
    this.ID=localStorage.getItem('id');
    this.http.post('/api/mySchedule',{id:this.ID}).subscribe(data=>{
      console.log(this.mySchedule);
      this.mySchedule=Array.prototype.slice.call(data); //将类数组对象转换为数组
      // this.mySchedule=data;
      console.log(this.mySchedule);
    });
    // this.http.post('/api/mySchedule/year',{id:this.ID}).subscribe(data=>{
    //   //this.mySchedule=Array.prototype.slice.call(data); //将类数组对象转换为数组
    //   // this.year=data;
    //   // console.log(this.year);
    // });
    // document.querySelector('#addcalendar').addEventListener('click',()=>{
    //   // let profileModal=this.modalCtrl.create(CalendarPage);
    //   // profileModal.present();
    //   this.navCtrl.push(CalendarPage)
    // },false)
  }
  goCalender(){
    this.navCtrl.push(CalendarPage);
  }
}
