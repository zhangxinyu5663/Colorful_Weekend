import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Content01Page } from '../content01/content01';

/**
 * Generated class for the SearchtwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchtwo',
  templateUrl: 'searchtwo.html',
})
export class SearchtwoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }

  // searchText;
  // ionViewDidLoad() {
  //   this.searchText=localStorage.getItem('searchText');
  //   this.http.post('/api/search',{searchText:this.searchText}).subscribe(data=>{
  //     console.log(data);
  //   });
  // }
  goBack(){
    this.navCtrl.pop();
  }

  obj=[];//用于盛放后端传回的搜索结果
  Myzan=[];
  Flag=[];//标记心是否被点击过
  userID; //用户ID
  searchText; //搜索的内容
  heart;
  zanflag;

  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.heart = document.getElementsByClassName('heart'); 
    // console.log(this.heart);
    this.searchText=localStorage.getItem('searchText');

    this.http.post('/api/search',{searchText:this.searchText}).subscribe(data=>{
      this.obj=Array.prototype.slice.call(data);
      console.log(this.obj);
      for(var k=0;k<this.obj.length;k++){
        this.Flag[k]=false;
      }
      // console.log(this.Flag);
      this.http.post('/api/zan',{userID:this.userID}).subscribe(data=>{
        this.Myzan=data['Myzan'];
        console.log(this.Myzan);  
        for(var j=0;j<this.Myzan.length;j++){
          for(var i=0;i<this.obj.length;i++){
            if(this.Myzan[j].projectID == this.obj[i].projectID){
              // console.log(this.obj[i].projectID);
              // this.heart[i].style.color="#fd273f";
              this.Flag[i]=true;
            }
          }
        }
        console.log(this.Flag);
      });
    });
  }

  detail(i){
    localStorage.setItem('homedetailID',this.obj[i].projectID);
    this.navCtrl.push(Content01Page);
  }

  //点赞
  // tag=true;
  // homeProjectZanFlag=[];
  // zanflag;
  
  clickZan(i){
    // this.heart = document.getElementsByClassName('heart')[i]; 
    // var zanNum = document.getElementsByClassName('zanNum');
    //console.log(zanNum[i].innerHTML);
    if(this.Flag[i]==false){
      // this.heart.style.color="#fd273f";
      // this.zanflag=1;
      // var zanNum=parseInt(zanNum[i].innerHTML);
      this.obj[i].zan+=1;
      // this.zanflag='true';
      //var isclick=this.heart.getAttribute("isclick");
      // if(isclick=="true"){
      //   this.heart.style.cssText="font-size:17px;";
      //   zanNum=zanNum+1;
      //   zan[i].innerHTML=String(zanNum);
      //   var Bisclick=!Boolean(isclick);
      //   this.heart.setAttribute('isclick',String(Bisclick));
      //   console.log(this.obj[i].projectID);
      this.http.post('/api/home/addZan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
          //console.log(data);
      });
      this.Flag[i]=true;
    }else{
      //this.heart.style.color="rgb(212, 208, 208)";
      // this.zanflag=0;
      this.obj[i].zan-=1;
      this.http.post('/api/home/delzan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
        //console.log(data);
      });
      this.Flag[i]=false;
    }
    // if(isclick!="true"){
    //   this.heart.style.cssText="font-size:15px;";
    //   zanNum=zanNum-1;
    //   zan[i].innerHTML=String(zanNum);
    //   isclick="true";
    //   this.heart.setAttribute('isclick',isclick);
    //   this.http.post('/api/home/delzan',{zanNum:zanNum,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
    //     console.log(data);
    // })
    //}
  }

  search(){
    this.http.post('/api/search',{searchText:this.searchText}).subscribe(data=>{
      this.obj=Array.prototype.slice.call(data);
      console.log(this.obj);
      for(var k=0;k<this.obj.length;k++){
        this.Flag[k]=false;
      }
      // console.log(this.Flag);
      this.http.post('/api/zan',{userID:this.userID}).subscribe(data=>{
        this.Myzan=data['Myzan'];
        console.log(this.Myzan);  
        for(var j=0;j<this.Myzan.length;j++){
          for(var i=0;i<this.obj.length;i++){
            if(this.Myzan[j].projectID == this.obj[i].projectID){
              // console.log(this.obj[i].projectID);
              // this.heart[i].style.color="#fd273f";
              this.Flag[i]=true;
            }
          }
        }
        console.log(this.Flag);
      });
    });
  }
}
