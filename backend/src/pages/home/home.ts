import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { UserdetailPage } from '../userdetail/userdetail';
import { HomeScheduleDetailPage } from '../home-schedule-detail/home-schedule-detail';
import { NewhomeSchedulePage } from '../newhome-schedule/newhome-schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private http:HttpClient,public modalCtrl: ModalController) {

  }
  num=1;
  userName;
  flag=false;


  user=[];  //用户账号管理
  ionViewDidLoad(){
    this.userName=localStorage.getItem('userName');
    this.http.get('/api/info').subscribe(data=>{
      //console.log(data);
      this.user=Array.prototype.slice.call(data); 
    });
  }
  fun(i){
    this.num=i;
    if(i==1){
      this.endOne(i);
    }else if(i==2){
      this.endTwo(i);
    }else if(i==3){
      var hiddenul=document.getElementById('hiddenUL1');
      if(this.flag==false){
        hiddenul.style.display='block';
      }else{
        hiddenul.style.display='none';
      }
      this.flag=!this.flag;
    }else if(i==5){

    }else if(i==6){
      var hiddenul=document.getElementById('hiddenUL2');
      if(this.flag==false){
        hiddenul.style.display='block';
      }else{
        hiddenul.style.display='none';
      }
      this.flag=!this.flag;
    }else if(i==7){
      this.endSeven(i);
    }else if(i==8){

    }else if(i==9){

    }
  }
  endOne(i){
    this.http.get('/api/info').subscribe(data=>{   //请求账号信息
      this.user=Array.prototype.slice.call(data); 
    });
  }

  back;  //冻结账号返回的信息
  userID;  //用户的ID
  freeze(i){  //冻结账号
    this.userID=this.user[i].ID;
    var us=document.getElementsByClassName('userStatus')[i];
    us.innerHTML='已冻结';
    this.http.post('/api/freezeUser',{id:this.userID}).subscribe(data=>{
      this.back=data;
      console.log(this.back.info);
    });
  }
  unfreeze(j){  //解冻账号
    this.userID=this.user[j].ID;
    console.log(this.userID);
    // var btn=document.getElementsByClassName('unfreeze')[j];
    // btn.innerHTML='已解冻';
    var us=document.getElementsByClassName('userStatus')[j];
    us.innerHTML='正常';
    this.http.post('/api/unfreezeUser',{id:this.userID}).subscribe(data=>{
      this.back=data;
      console.log(this.back.info);
    });
  } 

  userDetail=[];  //用户信息详情
  ucheck(k){ //查看用户详情
    this.userID=this.user[k].ID;
    console.log(this.userID);
    localStorage.setItem("userdetailID",this.userID);
    // localStorage.removeItem("detailID");
    let profileModal = this.modalCtrl.create(UserdetailPage);
    profileModal.present();
  }

  typeTextone;
  textone;
  searchone(){
    // console.log(this.typeTextone);
    // console.log(this.textone);
    if(this.typeTextone=='all'){
      this.http.get('/api/info').subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='phone'){
      this.http.post('/api/search/phone',{phone:this.textone}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='sex'){
      this.http.post('/api/search/sex',{sex:this.textone}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='userStatus'){
      this.http.post('/api/search/userStatus',{userStatus:this.textone}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='id'){
      this.http.post('/api/searchone/id',{id:this.textone}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='status'){
      this.http.post('/api/search/status',{lstatus:this.textone}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }
  }

  activity=[];  //用户活动管理
  endTwo(i){
    this.http.get('/api/activity').subscribe(data=>{  //请求用户活动信息
      this. activity=Array.prototype.slice.call(data); 
    });
  }
  typeTexttwo;
  texttwo;
  searchtwo(){
    // console.log(this.typeTextone);
    // console.log(this.textone);
    if(this.typeTexttwo=='all'){
      this.http.get('/api/activity').subscribe(data=>{
        this.activity=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTexttwo=='id'){
      this.http.post('/api/searchtwo/id',{id:this.texttwo}).subscribe(data=>{
        this.activity=Array.prototype.slice.call(data); 
      });
    }
  }

  search;
  clear(){
    this.search=document.getElementsByClassName('search');
    console.log(this.search.length);
    for(var i=0;i<this.search.length;i++){
      console.log(this.search[i]);
      this.search[i].value='';
    }
  }

  homeSchedule=[]; //推荐日程管理
  endSeven(i){
    this.http.get('/api/homeSchedule').subscribe(data=>{  //请求首页推荐日程信息
      this.homeSchedule=Array.prototype.slice.call(data);
    });
  }

  hsID; //首页推荐日程id
  homeScheduleCheck(i){ //查看首页推荐日程详情
    this.hsID=this.homeSchedule[i].hsID;
    console.log(this.hsID);
    localStorage.setItem("hsDetailID",this.hsID);
    let profileModal = this.modalCtrl.create(HomeScheduleDetailPage);
    profileModal.present();
  }

  newHS(){ //新建首页推荐日程详情
    let profileModal = this.modalCtrl.create(NewhomeSchedulePage);
    profileModal.present();
  }

  file;
  img;
  inp;
  upload(){  //上传文件
    this.img=document.getElementById('img');
    var btn=document.getElementById('btn');
    this.inp=document.getElementById('inp'); 
    // 2.获取上传的数据
    var getData=this.inp.files[0];
    console.log(getData.name);
    // 2.1创建格式化数据，
    var fd=new FormData();
    // 2.2格式化数据并以键值对的形式存放到fd对象中
    fd.append('imageIcon',getData);
    // 3.1创建XMLHttpRequest对象
    var xhr=new XMLHttpRequest();
    // 3.2使用open方法,设置请求
    xhr.open('POST','/api/ajaxUpload',true)
    // 3.3使用send方法发送数据
    xhr.send(fd);
    // 3.4监听发送数据状态
    var that=this;
    xhr.onreadystatechange=function(){
      if(xhr.readyState===4){
        console.log(xhr.responseText);
        that.img.src=xhr.responseText;
        //imga.src='http://192.168.73.144:8080/avatar/1544688041115.jpg';
        //console.log(imga.src);
      }
    }
  }
}
