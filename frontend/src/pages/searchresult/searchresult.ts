import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomeDetailPage } from '../homedetail/homedetail';
/**
 * Generated class for the SearchresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchresult',
  templateUrl: 'searchresult.html',
})
export class SearchresultPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }

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
    this.navCtrl.push(HomeDetailPage);
  }

  //点赞
  clickZan(i){
    if(this.Flag[i]==false){
      this.obj[i].zan+=1;
      this.http.post('/api/home/addZan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
          //console.log(data);
      });
      this.Flag[i]=true;
    }else{
      this.obj[i].zan-=1;
      this.http.post('/api/home/delzan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
        //console.log(data);
      });
      this.Flag[i]=false;
    }
  }

  search(){
    this.http.post('/api/search',{searchText:this.searchText}).subscribe(data=>{
      this.obj=Array.prototype.slice.call(data);
      console.log(this.obj);
      for(var k=0;k<this.obj.length;k++){
        this.Flag[k]=false;
      }
      this.http.post('/api/zan',{userID:this.userID}).subscribe(data=>{
        this.Myzan=data['Myzan'];
        console.log(this.Myzan);  
        for(var j=0;j<this.Myzan.length;j++){
          for(var i=0;i<this.obj.length;i++){
            if(this.Myzan[j].projectID == this.obj[i].projectID){
              this.Flag[i]=true;
            }
          }
        }
        console.log(this.Flag);
      });
    });
  }

}
