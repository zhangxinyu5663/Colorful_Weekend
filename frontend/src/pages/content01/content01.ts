import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Slides } from "ionic-angular";
import { ViewChild } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';

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
  
  constructor(public modalCtrl:ModalController,public cd: ChangeDetectorRef,private alertCtrl: AlertController,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  homeDetail;//作品详情
  homeComments;//作品评论
  // ionViewWillEnter(){
    
  // }
  homedetailID;//用来记录页面跳转的是哪个作品的详情
  homedetailUserID; //点开的作品的发布者的ID
  obj;//请求的这个作品
  userID;//标记此时是哪个用户登录
  context;//作品详细介绍的内容
  imgs=[];//用来盛放作品图片数组
  zanflag; //作品是否被赞过的标记
  heart; //代表心形图标
  Myzan; //判断这个作品是否被赞过的返回结果
  collectflag; //作品是否被收藏过的标记
  collection;//代表点击的这个收藏图标
  Mycollection; //判断这个作品是否被收藏过的返回结果
  attentionflag;//发表作品的人是否关注过的标记
  Myattention; //判断这个人是否被关注过的返回结果

  ionViewWillEnter(){
    this.collection=document.getElementById('collection');
    this.heart = document.getElementById('heart'); 
    this.Abtn=document.getElementById('abtn');
     //获得当前用户登录的userID。
     this.userID=localStorage.getItem('id');
     this.homedetailID=localStorage.getItem('homedetailID');
    console.log(this.homedetailID);
    console.log(this.userID);
     //请求作品详情
     this.http.post('/api/homedetail',{id:this.homedetailID}).subscribe(data=>{
       //console.log(data);
       this.homeDetail=data['detail'][0];
       this.homeComments=data['comments'];
       this.imgs=this.homeDetail.imgs.split("|");
       this.obj=this.homeDetail;
       this.context=this.obj.context;
       //console.log(this.context);
       this.homedetailUserID=this.obj.userID;
       console.log(this.homeComments);

       this.http.post('/api/my/specificAttention',{homedetailUserID:this.homedetailUserID,userID:this.userID}).subscribe(data=>{
        this.Myattention=data['status'];
          if(this.Myattention==1){
            this.attentionflag=true;
            this.Abtn.innerHTML='已关注';
          }else{
            this.attentionflag=false;
          }
        });

       this.show();
     });
     this.http.post('/api/my/specificCollection',{userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
         this.Mycollection=data['status'];
         //this.collection=document.getElementById('collection');
         if(this.Mycollection==1){
           this.collectflag=true;
         }else{
          this.collectflag=false;
         }
     });
     this.http.post('/api/my/specificZan',{userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
      this.Myzan=data['status'];
      //this.collection=document.getElementById('collection');
      if(this.Myzan==1){
        this.zanflag=true;
      }else{
       this.zanflag=false;
      }
  });
  }
  ionViewDidEnter(){
    // var that=this;
    // $(".reply_btn").click(function reply(RowGuid){
    //   console.log(RowGuid);
    //   $("#reply_textarea").remove();
    //   $(this).parent().append("<div id='reply_textarea'><textarea id='textarea' cols='45' rows='4'></textarea><br/><button id='publish'>发表</button></div>");
    //   var reply_textarea=document.getElementById('reply_textarea');
    //   reply_textarea.style.cssText = "width:100%;height:80px;text-align:center;"
    //   var textarea = document.getElementById('textarea');
    //   textarea.setAttribute("placeholder","快写下你的评论吧~");
    //   textarea.style.cssText="margin-top:15px;"
    //   var pub=document.getElementById('publish');
    //   pub.style.cssText = "display:block;float:right;";
    //   console.log(pub);
    //   //btn.addEventListener("click",that.button); 
    //   pub.addEventListener("click",function(){
    //     var textarea = document.getElementById('textarea');
    //     var text=textarea.innerHTML;
    //     if(text==''){
    //       that.presentAlert();
    //     }else{
    //       that.http.post('/api/addcomment',{RowGuid:RowGuid,userID:that.userID,context:text,projectID:that.homedetailID}).subscribe(data=>{
    //         console.log(data);
    //       });
    //     }
    //   },false);
    // })
    // $(".reply_btn").click(function(RowGuid)
    
    // this.allcomment();
  }

  //弹出评论框
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '评论不能为空',
      // subTitle: '10% of battery remaining',
      buttons: ['确认']
    });
    alert.present();
  }
//评论作品
inpcomment;
head;//头像
userName;//用户名
time;
comment(){
  this.inpcomment=document.getElementById('inpcomment');
  this.time=this.getDate();
  this.http.post('/api/majorcomment',{userID:this.userID,date:this.time,context:this.inpcomment.value,projectID:this.homedetailID}).subscribe(data=>{
      console.log(data);
      this.head=data['head'];
      this.userName=data['userName'];
      $(".exter").append("<li class='exterli'><span id='user' ><img src='' id='uimg'></span><div id='commentdetail'><p style='margin:0' id='p1'></p><p style='margin:0  ' id='p2'></p><p style='margin:0  ' class='data' id='p3'></p></div></li>");
      $("#uimg").attr('src',this.head);
      $("#p1").text(this.userName);//username
      $("#p2").text(this.inpcomment.value);
      $("#p3").text(this.time);//时间
      this.inpcomment.value='';
    });
  
}

month;
strdate;
hour;
minutes;
getDate(){   //获取当前时间函数
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  this.month = date.getMonth() + 1;
  this.strdate = date.getDate();
  this.hour= date.getHours();
  this.minutes=date.getMinutes();
  if (this.month >= 1 && this.month <= 9) {
      this.month = "0" + this.month;
  }
  if (this.strdate >= 0 && this.strdate <= 9) {
      this.strdate = "0" + this.strdate;
  }
  if (this.hour >= 0 && this.hour <= 9) {
    this.hour = "0" + this.hour;
  }
  if (this.minutes >= 0 && this.minutes <= 9) {
    this.minutes = "0" + this.minutes;
  }
  var currentdate = date.getFullYear() + seperator1 + this.month + seperator1 + this.strdate
          + " " + this.hour+ seperator2 + this.minutes;
          // + seperator2 + date.getSeconds();
  return currentdate;
}
//点击展开全部和收起的函数
show(){ 
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
//退出这个界面
  isColor:boolean = true;
  close(){
    this.navCtrl.pop();
  }
//关注此用户
Abtn;
attention(){
    this.Abtn=document.getElementById('abtn');
    if(this.attentionflag==false){
      this.Myattention=1;
      this.Abtn.innerHTML='已关注'
      this.http.post('/api/homedetail/attentUser',{userID:this.userID,ToUserID:this.obj.userID}).subscribe(data=>{
        console.log(data);
      });
      this.attentionflag=true;
    }else{
      this.Myattention=0;
      this.Abtn.innerHTML='关注';
      this.http.post('/api/homedetail/delAttentUser',{userID:this.userID,ToUserID:this.obj.userID}).subscribe(data=>{
        console.log(data);
      });    
      this.attentionflag=false;
    }
    // var isclick=this.Abtn.getAttribute("isclick");
    // console.log(isclick);
    // if (isclick == "true") {
    //   isclick=!Boolean(isclick);
    //   this.Abtn.setAttribute('isclick',String(isclick));
    //   this.Abtn.innerText = "已关注";
    //   this.http.post('/api/homedetail/attentUser',{userID:this.userID,ToUserID:this.obj.userID}).subscribe(data=>{
    //     console.log(data);
    //   })
    // }
    // else {
    //   isclick="true";
    //   this.Abtn.setAttribute('isclick',isclick);
    //   this.Abtn.innerText = "关注";
    //   this.http.post('/api/homedetail/delAttentUser',{userID:this.userID,ToUserID:this.obj.userID}).subscribe(data=>{
    //     console.log(data);
    //   })     
    //}
}

 //收藏此作品
 collect(){
    //this.collection=document.getElementById('collection');
    if(this.collectflag==false){
      // this.collection.style.color="rgb(252, 249, 63)";
      this.obj.collection+=1;
      this.Mycollection=1;
      this.http.post('/api/homedetail/collect',{collectionNum:this.obj.collection,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
        console.log(data);
      });
      this.collectflag=true;
    }else{
      // this.collection.style.color="rgb(212, 208, 208)";
      this.obj.collection-=1;
      this.Mycollection=0;
      this.http.post('/api/homedetail/delcollect',{collectionNum:this.obj.collection,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
        console.log(data);
      });
      this.collectflag=false;
    }
    // var isclick=this.collection.getAttribute("isclick");
    // console.log(isclick);
    // var collectionNum;
    // if(isclick == "true"){
    //   this.collection.style.color="yellow";
    //   this.collection.style.size="17px";
    //   collectionNum=parseInt(document.getElementById('collectionNum').innerText);
    //   collectionNum=collectionNum+1;
    //   console.log(collectionNum);
    //   document.getElementById('collectionNum').innerText=collectionNum;
    //   isclick=!Boolean(isclick);
    //   console.log(String(isclick));
    //   this.collection.setAttribute('isclick',String(isclick));
    //   this.http.post('/api/homedetail/collect',{collectionNum:collectionNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
    //     console.log(data);
    //   })
    // }
    // else{
    //   this.collection.style.color="black";
    //   collectionNum=parseInt(document.getElementById('collectionNum').innerText);
    //   collectionNum=collectionNum-1;
    //   document.getElementById('collectionNum').innerText=collectionNum;
    //   isclick="true";
    //   this.collection.setAttribute('isclick',isclick);
    //   this.http.post('/api/homedetail/delcollect',{collectionNum:collectionNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
    //     console.log(data);
    //   })
    // }        
 }

 //点赞此作品
 zan(){
   this.heart = document.getElementById('heart'); 
   //var zan = document.getElementById('zanNum');
   //var zanNum=parseInt(zan.innerHTML);
   if(this.zanflag==false){
     this.obj.zan+=1;
     this.Myzan=1;
    // var zanNum=parseInt(zanNum[i].innerHTML);
    //var isclick=this.heart.getAttribute("isclick");
    // if(isclick=="true"){
    //   this.heart.style.cssText="font-size:17px;";
    //   zanNum=zanNum+1;
    //   zan[i].innerHTML=String(zanNum);
    //   var Bisclick=!Boolean(isclick);
    //   this.heart.setAttribute('isclick',String(Bisclick));
    //   console.log(this.obj[i].projectID);
    this.http.post('/api/home/addZan',{zanNum:this.obj.zan,userID:this.userID,projectID:this.obj.projectID}).subscribe(data=>{
        console.log(data);
    });
    this.zanflag=true;
  }else{
    this.obj.zan-=1;
    this.Myzan=0;
    this.http.post('/api/home/delzan',{zanNum:this.obj.zan,userID:this.userID,projectID:this.obj.projectID}).subscribe(data=>{
      console.log(data);
    });
    this.zanflag=false;
  }
  //  var isclick=this.heart.getAttribute("isclick");
  //  if(isclick=="true"){
  //    this.heart.style.cssText="font-size:17px;";
  //    zanNum=zanNum+1;
  //    zan.innerHTML=String(zanNum);
  //    var Bisclick=!Boolean(isclick);
  //    this.heart.setAttribute('isclick',String(Bisclick));
  //    this.http.post('/api/home/zan',{zanNum:zanNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
  //        console.log(data);
  //    })
  //  }
  //  if(isclick!="true"){
  //    this.heart.style.cssText="font-size:15px;";
  //    zanNum=zanNum-1;
  //    zan.innerHTML=String(zanNum);
  //    isclick="true";
  //    this.heart.setAttribute('isclick',isclick);
  //    this.http.post('/api/home/delzan',{zanNum:zanNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
  //      console.log(data);
  //  })
  //  }
 }

//展开全部评论函数(暂未想出来)。
  allcomment(){
    var liNum = document.getElementsByClassName('inner')[0].children;
    console.log(liNum);
    // var replyButton=document.getElementById('replyButton');

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