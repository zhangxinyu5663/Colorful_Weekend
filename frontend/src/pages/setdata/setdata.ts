import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SetPage } from '../set/set';
import { HttpClient } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-setdata',
  templateUrl: 'setdata.html',
})
export class SetdataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public http:HttpClient) {

  }
  userName;
  month;
  year;
  date;
  college;
  Email;
  address;
  sex;
  id;
  birthday;
  introduction;
  back; //设置个人信息返回的数据
  info; //请求个人信息返回的数据
  ionViewDidLoad(){
    this.id=localStorage.getItem('id');
    this.http.post('/api/info',{id:this.id}).subscribe(data=>{
      this.info=Array.prototype.slice.call(data); //将类数组对象转换为数组
      console.log(this.info);
      this.birthday=this.info[0].birthday;
      var bir=this.birthday.split('-');
      console.log(bir);
      this.year=bir[0];
      this.month=bir[1];
      this.date=bir[2];
      this.introduction=this.info[0].introduction;
      this.address=this.info[0].address;
      this.Email=this.info[0].Email;
      this.sex=this.info[0].sex;
      this.college=this.info[0].college;
      this.userName=this.info[0].userName;
    });
  }
  goBack(){this.navCtrl.push(SetPage);}
  goTips(){
    this.id=localStorage.getItem('id');
    // console.log(this.sex);
    // console.log(this.userName,this.year,this.month,this.date,this.college,this.Email,this.address,this.introduction);
    this.birthday=this.year+'-'+this.month+'-'+this.date;
    this.http.post('/api/setInfo',{id:this.id,userName:this.userName,sex:this.sex,birthday:this.birthday,college:this.college,email:this.Email,address:this.address,introduction:this.introduction}).subscribe(data=>{
      this.back=data;
      if(this.back.status==1){
        console.log('设置信息成功！');
        let alert = this.alertCtrl.create({
          subTitle: '修改成功!',
          buttons: ['确认']
        });
        alert.present();
      }
    });
  }
  // 该死的第二种方法的ts文件
  //list=[{"key":"male","value":'男',"chek":true},{"key":"female","value":'女',"chek":false}];
  // data={"key":"female","value":'女',"chek":false};
  // public  chekFun(i){
  //   let me=this;
  //   this.list.forEach(function(data,inde,array) {
  //     if(i==inde){
  //       data.chek=true;
  //       me.data=data;
  //     }else{
  //       data.chek=false
  //     }
  //   });
  // }
}
