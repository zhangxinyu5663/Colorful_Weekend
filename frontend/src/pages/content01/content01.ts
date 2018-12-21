import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Slides } from "ionic-angular";
import { ViewChild } from "@angular/core";
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Content01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-content01',
  templateUrl: 'content01.html',
})
export class Content01Page {
  @ViewChild(Slides) slides: Slides;
  homedetailID;//用来记录页面跳转的是哪个作品的详情
  obj;
  userID;//标记此时是哪个用户登录
  context;//
  imgs=[];//用来盛放作品图片数组
  constructor(private alertCtrl: AlertController,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  homeDetail;
  homeComments;
  ionViewWillEnter(){
    
  }
  ionViewDidLoad(){
     //获得当前用户登录的userID。
     this.userID=localStorage.getItem('id')
     this.homedetailID=localStorage.getItem('homedetailID');
     this.http.post('/api/homedetail',{id:this.homedetailID}).subscribe(data=>{
       this.homeDetail=data['detail'][0];
       this.homeComments=data['comments'];
       console.log(this.homeComments);
       this.imgs=this.homeDetail.imgs.split("|");
       this.obj=this.homeDetail;
       this.context=this.obj.context;
       this.show();
     })
  }
  ionViewDidEnter(){
    
    // this.allcomment();
  }
  
//点击展开全部和收起的函数
show()
{ 
  if(typeof this.context != "undefined"){
    var box = document.getElementById("box");
    var text = this.context;
    var newBox = document.createElement("div"); 
    var btn = document.createElement("a"); 
    btn.style.cssText = "display:block;float:right";
    newBox.innerHTML = text.slice(0,80)+"..."; 
    btn.innerHTML = text.length > 80 ? "...显示全部" : ""; 
    btn.href = "###"; 
    btn.onclick = function(){ 
      if(btn.innerHTML == "...显示全部")
      { 
        btn.innerHTML = "收起"; 
        newBox.innerHTML = text; 
      }
      else
      { 
        btn.innerHTML = "...显示全部"; 
        newBox.innerHTML = text.slice(0,80)+"..."; 
      } 
    }
    box.innerHTML = ""; 
    box.appendChild(newBox); 
    box.appendChild(btn); 
    } 

} 

  isColor:boolean = true;
  close(){
    this.navCtrl.pop();
  }

  change(){
    this.isColor=!this.isColor;
    if (this.isColor == true) {
      document.getElementById('btn').innerText = "关注";
    }
    else {
        document.getElementById('btn').innerText = "已关注";
    }
  }
  //弹出回复评论窗口
  presentPrompt(RowGuid) {
    let alert = this.alertCtrl.create({
      title: 'Reply',
      inputs: [
        {
          name: 'reply',
          placeholder: '你想回复啥~'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: '发表',
          handler: data => {
            this.http.post('/api/addcomment',{RowGuid:RowGuid,userID:this.userID,context:data.reply,projectID:this.homedetailID}).subscribe(data=>{
                console.log(data);
            });
          }
        }
      ]
    });
    alert.present();
  }
//展开全部评论函数(暂未想出来)。
  allcomment(){
    var liNum = document.getElementsByClassName('inner')[0].children;
    console.log(liNum);
    var replyButton=document.getElementById('replyButton');

    // if(liNum==0){
    //   replyButton.style.display="none";
    // }
    // if(liNum>0){
    //   replyButton.style.display="block";
    //   replyButton.onclick=function(){

    //   }
    // }
  }

}