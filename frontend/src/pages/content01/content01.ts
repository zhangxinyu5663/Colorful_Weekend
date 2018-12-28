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
  
  homedetailID;//用来记录页面跳转的是哪个作品的详情
  obj;//请求的这个作品
  userID;//标记此时是哪个用户登录
  context;//作品详细介绍的内容
  imgs=[];//用来盛放作品图片数组
  constructor(public modalCtrl:ModalController,public cd: ChangeDetectorRef,private alertCtrl: AlertController,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  homeDetail;//作品详情
  homeComments;//作品评论
  RowGuid;//评论标志号
  li;//评论的li
  reply_btn;//代表回复按钮
  ionViewWillEnter(){
     //获得当前用户登录的userID。
     localStorage.setItem('userID',"234567");
     this.userID=localStorage.getItem('userID');
     this.homedetailID=localStorage.getItem('homedetailID');

     //请求作品详情
     this.http.post('/api/homedetail',{id:this.homedetailID}).subscribe(data=>{
       this.homeDetail=data['detail'][0];
       this.homeComments=data['comments'];
       this.imgs=this.homeDetail.imgs.split("|");
       this.obj=this.homeDetail;
       this.context=this.obj.context;
      //  console.log(this.homeComments);
       this.show();
     })
  }
  ionViewDidEnter(){
    var that=this;

    this.li=document.getElementsByClassName('exterli');
    this.reply_btn=document.getElementsByClassName('reply_btn');
    console.log("li:",this.li);
    console.log("reply_btn:",this.reply_btn); 
    //弹出评论框，评论完向后台发出请求
    for(var i =0;i<this.reply_btn.length;i++){
      //设置标记位
      this.reply_btn[i].setAttribute("count",i);
      console.log("reply_btn:",this.reply_btn[i].getAttribute("count"));

      this.reply_btn[i].addEventListener("click",function(){
        // var i=parseInt($(".reply_btn").html().match(/\d/g)[0]);
        console.log(this);
        // console.log(RowGuid);
        $("#reply_textarea").remove();
        $(this).parent().append("<div id='reply_textarea'><textarea id='textarea' cols='45' rows='4'></textarea><br/><button id='publish'>发表</button></div>");
        var reply_textarea=document.getElementById('reply_textarea');//获取多行文本输入框外面的盒子
        reply_textarea.style.cssText = "width:100%;height:80px;text-align:center;"
        var textarea = document.getElementById('textarea');//获取多行文本输入框
        textarea.setAttribute("placeholder","快写下你的评论吧~");
        textarea.style.cssText="margin-top:15px;"
        // that.RowGuid=document.getElementsByClassName('RowGuid')[1].innerHTML;
        // console.log(that.RowGuid);
        var pub=document.getElementById('publish');//获取点击发表的按钮
        pub.style.cssText = "display:block;float:right;";
        console.log(pub);
        //btn.addEventListener("click",that.button); 
        pub.addEventListener("click",function(){
          var text=textarea['value'];
          console.log("内容：",text);
          if(text==''){
            that.presentAlert();
          }else{
            pub.style.cssText = "display:none;float:right;";
            that.http.post('/api/addcomment',{RowGuid:that.RowGuid,userID:that.userID,context:text,projectID:that.homedetailID}).subscribe(data=>{
              console.log(data);
            });
          }
        },false);
      })
    }
    // this.reply(RowGuid);
    // this.allcomment();
  
  }

 // 弹出评论框
  reply_textarea;
  textarea;
  publish;
  // reply(RowGuid,i){
  //   console.log(RowGuid,i);
  //   this.reply_textarea=document.getElementsByClassName('reply_textarea');
  //   console.log(this.reply_textarea);
  //   this.reply_textarea[i].style.display="block";
  // };

//弹出为空的提示框
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '评论不能为空',
      // subTitle: '10% of battery remaining',
      buttons: ['确认']
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
  close(){
    this.navCtrl.pop();
  }
//关注此用户
Abtn;
attention(){
    this.Abtn=document.getElementById('btn');
    var isclick=this.Abtn.getAttribute("isclick");
    console.log(isclick);
    if (isclick == "true") {
      isclick=!Boolean(isclick);
      this.Abtn.setAttribute('isclick',String(isclick));
      this.Abtn.innerText = "已关注";
      this.http.post('/api/homedetail/attentUser',{userID:this.userID,ToUserID:this.obj.userID}).subscribe(data=>{
        console.log(data);
      })
    }
    else {
      isclick="true";
      this.Abtn.setAttribute('isclick',isclick);
      this.Abtn.innerText = "关注";
      this.http.post('/api/homedetail/delAttentUser',{userID:this.userID,ToUserID:this.obj.userID}).subscribe(data=>{
        console.log(data);
      })
        
    }
}

 //收藏此作品
 collection;//代表点击的这个收藏图标
 collect(){
    this.collection=document.getElementById('collection');
    var isclick=this.collection.getAttribute("isclick");
    console.log(isclick);
    var collectionNum;
    if(isclick == "true"){
      this.collection.style.color="yellow";
      this.collection.style.size="17px";
      collectionNum=parseInt(document.getElementById('collectionNum').innerText);
      collectionNum=collectionNum+1;
      console.log(collectionNum);
      document.getElementById('collectionNum').innerText=collectionNum;
      isclick=!Boolean(isclick);
      console.log(String(isclick));
      this.collection.setAttribute('isclick',String(isclick));
      this.http.post('/api/homedetail/collect',{collectionNum:collectionNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
        console.log(data);
      })
    }
    else{
      this.collection.style.color="black";
      collectionNum=parseInt(document.getElementById('collectionNum').innerText);
      collectionNum=collectionNum-1;
      document.getElementById('collectionNum').innerText=collectionNum;
      isclick="true";
      this.collection.setAttribute('isclick',isclick);
      this.http.post('/api/homedetail/delcollect',{collectionNum:collectionNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
        console.log(data);
    })
    }        
 }

 //点赞此作品
  heart;
  zan(){
    this.heart = document.getElementById('heart'); 
    var zan = document.getElementById('zanNum');
    var zanNum=parseInt(zan.innerHTML);
    var isclick=this.heart.getAttribute("isclick");
    if(isclick=="true"){
      this.heart.style.cssText="font-size:17px;";
      zanNum=zanNum+1;
      zan.innerHTML=String(zanNum);
      var Bisclick=!Boolean(isclick);
      this.heart.setAttribute('isclick',String(Bisclick));
      this.http.post('/api/home/zan',{zanNum:zanNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
          console.log(data);
      })
    }
    if(isclick!="true"){
      this.heart.style.cssText="font-size:15px;";
      zanNum=zanNum-1;
      zan.innerHTML=String(zanNum);
      isclick="true";
      this.heart.setAttribute('isclick',isclick);
      this.http.post('/api/home/delzan',{zanNum:zanNum,userID:this.userID,projectID:this.homedetailID}).subscribe(data=>{
        console.log(data);
    })
    }
  }
 

}