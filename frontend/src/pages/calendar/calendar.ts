import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  // event:string='briefcase';
  public typeTxt:any;
  detail;
  myDate;
  year;
  date;
  id;
  back;
  close(){
    this.navCtrl.pop();
  }
  switchType() {
    console.log(this.typeTxt);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }
  save(){
    this.id=localStorage.getItem('id');
    var arr=this.myDate.split('-');
    this.year=arr[0];
    this.date=arr[1]+'-'+arr[2];
    console.log(this.year);
    console.log(this.date);
    this.http.post('/api/addMySchedule',{type:this.typeTxt,year:this.year,date:this.date,detail:this.detail,id:this.id}).subscribe(data=>{
      this.back=data;
      if(this.back.status==1){
        this.navCtrl.push(ContactPage);
      }
    })
    //console.log(this.detail,this.myDate,this.typeTxt);
  }
  

}
