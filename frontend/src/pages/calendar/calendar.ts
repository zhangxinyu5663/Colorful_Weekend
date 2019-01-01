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
    // let elements = document.querySelectorAll(".tabbar");
    // if (elements != null) {
	  //   Object.keys(elements).map((key) => {
    // 		elements[key].style.display = 'flex';
    //   });
    // }
  }
  switchType() {
    console.log(this.typeTxt);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }

  userID;  //用户ID
  save(){
    this.userID=localStorage.getItem('id');
    // var arr=this.myDate.split('-');
    // this.year=arr[0];
    // this.date=arr[1]+'-'+arr[2];
    // console.log(this.year);
    // console.log(this.date);
    this.http.post('/api/addMySchedule',{type:this.typeTxt,year:this.year,date:this.myDate,detail:this.detail,userID:this.userID}).subscribe(data=>{
      this.back=data;
      if(this.back.status==1){
        console.log('添加成功');
        this.navCtrl.pop();
      }
    })
  }
  
  // ionViewDidEnter(){
  //   let elements = document.querySelectorAll(".tabbar");
  //   if (elements != null) {
  //      Object.keys(elements).map((key) => {
  //         elements[key].style.display = 'none';
  //     });
  //   }   
  // }
  // ionic当退出页面的时候触发的方法
  // ionViewWillLeave() {
  //   let elements = document.querySelectorAll(".tabbar");
  //   if (elements != null) {
	//     Object.keys(elements).map((key) => {
  //   		elements[key].style.display = 'flex';
	//     });
  //   }
  // }

}
