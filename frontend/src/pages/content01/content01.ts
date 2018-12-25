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
  obj;//请求的这个作品
  userID;//标记此时是哪个用户登录
  context;//作品详细介绍的内容
  imgs=[];//用来盛放作品图片数组
  zanflag; //作品是否被赞过的标记
  heart; //代表心形图标
  Mycollection; //判断这个作品是否被收藏过的返回结果
  collectflag; //作品是否被收藏过的标记
  collection;//代表点击的这个收藏图标

  ionViewWillEnter(){
    this.zanflag=this.navParams.get('zanflag');
    this.collection=document.getElementById('collection');
    if(this.zanflag==true){
      this.heart=document.getElementById('heart');
      this.heart.style.color="#fd273f";
    }
     //获得当前用户登录的userID。
     this.userID=localStorage.getItem('id');
     this.homedetailID=localStorage.getItem('homedetailID');
    console.log(this.homedetailID);
    console.log(this.userID);
     //请求作品详情
     this.http.post('/api/homedetail',{id:this.homedetailID}).subscribe(data=>{
       this.homeDetail=data['detail'][0];
       this.homeComments=data['comments'];
       this.imgs=this.homeDetail.imgs.split("|");
       this.obj=this.homeDetail;
       this.context=this.obj.context;
       //console.log(this.context);
       //console.log(this.obj.collection);
       this.show();
     });

     this.http.post('/api/my/specificCollection',{userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
         this.Mycollection=data['status'];
         //this.collection=document.getElementById('collection');
         if(this.Mycollection==1){
          //  console.log(this.Mycollection)
          //  console.log(this.collection)
           this.collectflag=true;
           //console.log(111);
          //  this.collection.style.color="rgb(252, 249, 63)";
         }else{
          this.collectflag=false;
         }
        //  console.log(this.collectflag);
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
  reply_textarea;
  textarea;
  publish;
  reply(RowGuid,i){
    console.log(RowGuid,i);
    this.reply_textarea=document.getElementsByClassName('reply_textarea');
    console.log(this.reply_textarea);
    this.reply_textarea[i].style.display="block";
  };

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '评论不能为空',
      // subTitle: '10% of battery remaining',
      buttons: ['确认']
    });
    alert.present();
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
  change(){
    this.isColor=!this.isColor;
    if (this.isColor == true) {
      document.getElementById('btn').innerText = "关注";
    }
    else {
        document.getElementById('btn').innerText = "已关注";
    }
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
    this.heart.style.color="#fd273f";
    // var zanNum=parseInt(zanNum[i].innerHTML);
    this.obj.zan+=1;
    this.zanflag='true';
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
  }else{
    this.heart.style.color="rgb(212, 208, 208)";
    this.obj.zan-=1;
    this.http.post('/api/home/delzan',{zanNum:this.obj.zan,userID:this.userID,projectID:this.obj.projectID}).subscribe(data=>{
      console.log(data);
    });
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