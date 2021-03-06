import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, ModalController, App } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { UserdetailPage } from '../userdetail/userdetail';
import { HomeScheduleDetailPage } from '../home-schedule-detail/home-schedule-detail';
import { NewhomeSchedulePage } from '../newhome-schedule/newhome-schedule';
import { LoginPage } from '../login/login';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { OfficalprojectPage } from '../officalproject/officalproject';
import { UserprojectPage } from '../userproject/userproject';
import { CreateprojectPage } from '../createproject/createproject';

import * as echarts from 'echarts'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,private http:HttpClient,public modalCtrl: ModalController,public app:App) {
    console.log(echarts);
  }
  goLogin(){ //退出登录
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }
 
  num=10;
  userName;
  flag=false;


  user=[];  //用户账号管理
  ionViewDidLoad(){
    // this.userName=localStorage.getItem('userName');
    // this.http.get('/api/info').subscribe(data=>{
    //   //console.log(data);
    //   this.user=Array.prototype.slice.call(data); 
    // });
    

  }
  ionViewWillEnter(){
    // 1.新增用户 柱状图
    const ec1 = echarts as any;
    console.log(document.getElementById('chart1'))
    var myChart1 = ec1.init(document.getElementById('chart1'));
    var optionchart1={
      title:{text: '增量数据-趋势总览'},
      tooltip:{trigger: 'axis'},
      color: ["#5F9EA0","#A2CD5A","#FFA54F"],
      legend: {
          padding: 0,
          x:"10px",
          y:"30px",
          icon: "circle", //图例的形状
          data:['新增注册用户','新增游客','常在活跃用户']
      },
      grid:{
          y:'80px'
      },
      scaleStartValue : 3000,
      calculable : true,
      xAxis : [
          {
              type : 'category',
              data : ['6月','7月','8月','9月','10月','11月',]
          }
      ],
      yAxis :[
          { 
              type : 'value',
          }
      ],
      // yAxis:{
      //     min:2000,
      //     max:12000, 
      // },
      toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
      series : [
          {
              name:'新增注册用户',
              type:'bar',
              data:[3333, 4055, 5055, 10599, 7188, 6588],barGap:0,
          },
          {
              name:'新增游客',
              type:'bar',
              data:[8008, 9999, 8022, 5666, 6588,7355],barGap:0,
          },
          {
              name:'常在活跃用户',
              type:'bar',
              data:[5454, 3888, 7088, 6088,8455,7122],barGap:0,
          },
      ]
    };
    myChart1.setOption(optionchart1);
    
    // //2.模块分析 折线图
    const ec2 = echarts as any;
    var myChart2 = ec2.init(document.getElementById('chart2'));
    var optionchart2={
      title:{text: '分区占比-数据总览'},
        tooltip:{
            trigger: 'axis',
            formatter:'{b}<br />\
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#EE6363"></span>\
              {a0}：{c0}%<br />\
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#912CEE"></span>\
              {a1}：{c1}%<br />\
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#90EE90"></span>\
              {a2}：{c2}%<br />'
        },
        color: ["#EE6363","#912CEE","#90EE90"],
        legend: {
            padding: 0,
            x:"10px",
            y:"30px",
            icon: "circle", //图例的形状
            data:['美食','电影','游玩']
        },
        grid:{
            y:'80px'
        },
        toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['6月','7月','8月','9月','10月','11月',]
            }
        ],
        // yAxis : [
        //     {
        //         type : 'value',
        //         axisLabel: {formatter: '{value} %'},
        //     }
        // ],
        yAxis: {
            min:0,
            max:100,
            axisLabel:{
                formatter: function (value) {
                    var texts = [];
                    if(value==0){texts.push('0');}
                    else if(value<= 20) {texts.push('20%');}
                    else if(value<= 40) {texts.push('40%');}
                    else if(value<= 60){texts.push('60%');}
                    else if(value<= 80){texts.push('80%');}
                    else{texts.push('100%');}
                    return texts;
                }
            }
        },
        series : [
            {
                name:'美食',
                type:'line',
                data:[23, 45, 19, 59, 50, 49],
                symbol:'star',
                symbolSize: 8,
            },
            {
                name:'电影',
                type:'line',
                data:[59, 40, 49, 31, 32, 29],
                symbol:'star',
                symbolSize: 8,
            },
            {
                name:'游玩',
                type:'line',
                data:[18, 15, 32, 10, 18, 22],
                symbol:'star',
                symbolSize: 8,
            }
        ]
    };
    myChart2.setOption(optionchart2);
    
    //3.播放来源 环形图
    const ec3 = echarts as any;
    var myChart3 = ec3.init(document.getElementById('chart3'));
    var optionchart3={
      title:{
        text:"播放来源-数据总览",
        x:"left",
        textStyle:{color:"#000000",fontSize:20}
      },
      toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
      legend:{
          padding: 0,
          orient:'vertical',//horizontal是水平
          x:"700px",
          y:"center",
          icon: "circle", //图例的形状
          width: 100,
          data:['Android','Web','iPhone','站外']
      },
      tooltip: {
          trigger: 'item',// 触发类型，默认数据触发，可选为：'item' ¦ 'axis'
      },
      backgroundColor: '#ffffff',
      textStyle: {color: 'rgba(0, 0, 0, 1)'},
      series : [
          {
          name: '访问来源',
          type: 'pie',
          radius: ['22%','40%'],//内圆心 外圆心
          data:[
              {value:680, name:'Android',itemStyle:{normal:{color:'#00BFFF'}}},
              {value:200, name:'Web',itemStyle:{normal:{color:'#40E0D0'}}},
              {value:495, name:'iPhone',itemStyle:{normal:{color:'#FFA07A'}}},
              {value:74, name:'站外',itemStyle:{normal:{color:'#FFA500'}}}
          ],
          //roseType: 'angle',南丁格尔图
          itemStyle: {
              normal:{borderWidth:2,borderColor:"#ffffff"},
              emphasis: {shadowBlur: 200,shadowColor: 'rgba(0, 0, 0, 0.1)'}},
          label: {
              normal: {textStyle: {color: 'rgba(1, 1, 1, 1)'}}},
          }
      ]
    };
    myChart3.setOption(optionchart3);

    //4.性别分析图 雷达图
    const ec4 = echarts as any;
    var myChart4 = ec4.init(document.getElementById('chart4'));
    var optionchart4={
      title : {
        text: '性别-数据分析'
      },
      tooltip : {
          trigger: 'axis'
      },
      color: ["#FF3030","#000080"],
      legend: {
          padding: 0,
          x:"10px",
          y:"30px",
          icon: "circle", //图例的形状
          data:['女','男']
      },
      grid:{
          y:'80px'
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      polar : [
      {
        indicator : [
            { text: '游玩页面浏览时长', max: 30000,color:"#000000"},
            { text: '美食页面浏览时长', max: 30000,color:"#000000"},
            { text: '电影页面浏览时长', max: 30000,color:"#000000"},
            { text: '注册用户', max: 100000,color:"#000000"},
            { text: '流量收益', max: 80000,color:"#000000"},
            { text: '活跃用户', max: 50000,color:"#000000"},
            ]
        }
    ],
    calculable : true,
    series : [
        {
            name: '性别-数据分析',
            type: 'radar',
            data : [
                {
                    value : [13000, 18000, 11000, 65000, 60000, 33000],
                    name : '女'
                },
                {
                    value : [19000, 10000, 18000, 35000, 34000, 24000],
                    name : '男'
                }
            ]
        }
      ]
    };
    myChart4.setOption(optionchart4);
  }


  lis;
  fun(i){
    this.num=i;
    this.lis=document.getElementsByClassName('li');
    this.lis[i-1].style.backgroundColor='#18A0A9';
    for(var j=0;j<this.lis.length;j++){
      if(j!=i-1){
        this.lis[j].style.backgroundColor='#32c2cd';
      }
    }
    if(i==1){
      this.endOne(i);
    }else if(i==2){
      this.endTwo(i);
    }else if(i==3){
      this.endThree(i);
      var hiddenul=document.getElementById('hiddenUL1');
      if(this.flag==false){
        hiddenul.style.display='block';
      }else{
        hiddenul.style.display='none';
      }
      this.flag=!this.flag;
     
    }else if(i==4){
      this.endFour(i);
    }else if(i==5){
      this.endFive(i);
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
      this.endNine(i);
    }else if(i==10){

    }
  }

  showUL(){
    var hide=document.getElementById('hide');
    if(this.flag==false){
      hide.style.display='block';
    }else{
      hide.style.display='none';
    }
    this.flag=!this.flag;
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

//作品管理
homeProject=[];//
endThree(i){
  this.http.get('/api/homeProject').subscribe(data=>{  //请求首页推荐作品
    this.homeProject=Array.prototype.slice.call(data); 
    console.log(this.homeProject);
  });
}
endFour(i){
  this.http.get('/api/officialProject').subscribe(data=>{  //请求系统推荐作品
    this.homeProject=Array.prototype.slice.call(data); 
    console.log(this.homeProject);
  });
}
endFive(i){
  this.http.get('/api/userProject').subscribe(data=>{  //请求系统推荐作品
    this.homeProject=Array.prototype.slice.call(data); 
    console.log(this.homeProject);
  });
}
comment;//所有评论
endNine(i){
  this.http.get('/api/comment').subscribe(data=>{  
    this.comment=Array.prototype.slice.call(data); 
    console.log(this.comment);
  });
}
//分类查询首页作品
typeTextthree;
textthree;
searchthree(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextthree=='all'){
    this.http.get('/api/homeProject').subscribe(data=>{  //请求首页推荐作品
      this.homeProject=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextthree=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchthree/projectID',{projectID:this.textthree}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextthree=='userID'){//请求用户ID号为...的作品
    this.http.post('/api/searchthree/userID',{projectID:this.textthree}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextthree=='palce'){//请求地点在哪的作品(待添加)
    this.http.post('/api/searchthree/place',{place:this.textthree}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
      console.log("按地点搜索：",this.homeProject);
    });
  }
}
//分类查看系统作品
typeTextfour;
textfour;
searchfour(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextfour=='all'){
    this.http.get('/api/officialProject').subscribe(data=>{  //请求首页推荐作品
      this.homeProject=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextfour=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchfour/projectID',{projectID:this.textfour}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextfour=='palce'){//请求地点在哪的作品(待添加)
    this.http.post('/api/searchfour/place',{place:this.textfour}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
      console.log("按地点搜索：",this.homeProject);
    });
  }
}
//分类查看用户作品
typeTextfive;
textfive;
searchfive(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextfive=='all'){
    this.http.get('/api/userProject').subscribe(data=>{  //请求用户作品
      this.homeProject=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextfive=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchfive/projectID',{projectID:this.textfive}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextfive=='userID'){//请求用户ID号为...的作品
    this.http.post('/api/searchfive/userID',{userID:this.textfive}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextfive=='palce'){//请求地点在哪的作品(待添加)
    this.http.post('/api/searchfive/place',{place:this.textfive}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
      console.log("按地点搜索：",this.homeProject);
    });
  }
}
//分类查询评论
typeTextnine;
textnine;
searchnine(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextnine=='all'){
    this.http.get('/api/comment').subscribe(data=>{  //请求用户作品
      this.comment=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextnine=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchnine/projectID',{projectID:this.textnine}).subscribe(data=>{
      this.comment=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextnine=='userID'){//请求用户ID号为...的作品
    this.http.post('/api/searchnine/userID',{userID:this.textnine}).subscribe(data=>{
      this.comment=Array.prototype.slice.call(data); 
    })
  }
}
//删除评论
commentID;
commentdelete(i){
  this.commentID=this.comment[i].RowGuid;
  this.http.post('/api/comment/delete',{RowGuid:this.commentID}).subscribe(data=>{
    console.log(data);
  });
  this.http.get('/api/comment').subscribe(data=>{  
    this.comment=Array.prototype.slice.call(data); 
    console.log(this.comment);
  });
}
//创建新的系统作品
createOproject(){
  let profileModal = this.modalCtrl.create(CreateprojectPage);
  profileModal.present();
}
//查看作品详情
projectdetailID;//记录点击的是哪个作品ID。
pcheck(i){//查看推荐作品详情
  this.projectdetailID=this.homeProject[i].projectID;
  localStorage.setItem("projectdetailID",this.projectdetailID);

  let profileModal = this.modalCtrl.create(ProjectDetailPage);
  profileModal.present();
}
opcheck(i){//查看系统作品详情
  this.projectdetailID=this.homeProject[i].projectID;
  localStorage.setItem("projectdetailID",this.projectdetailID);

  let profileModal = this.modalCtrl.create(OfficalprojectPage);
  profileModal.present();
}
upcheck(i){//查看用户作品详情
  this.projectdetailID=this.homeProject[i].pID;
  localStorage.setItem("projectdetailID",this.projectdetailID);

  let profileModal = this.modalCtrl.create(UserprojectPage);
  profileModal.present();
}
//删除作品
pdelete(i){//删除推荐作品
  this.projectdetailID=this.homeProject[i].projectID;
  this.http.post('/api/homeProject/delete',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  });
  this.http.get('/api/homeProject').subscribe(data=>{  //请求首页推荐作品
    this.homeProject=Array.prototype.slice.call(data); 
    console.log(this.homeProject);
  });
}
opdelete(i){//删除系统作品
  this.projectdetailID=this.homeProject[i].projectID;
  this.http.post('/api/officialProject/delete',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  })
}
updelete(i){//删除用户作品
  this.projectdetailID=this.homeProject[i].projectID;
  this.http.post('/api/userProject/delete',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  })
}
//推送系统作品到推荐
oppush(i){
  this.projectdetailID=this.homeProject[i].projectID;
  this.http.post('/api/officialProject/push',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  })
}
//推送用户作品到推荐
uppush(i){
  this.projectdetailID=this.homeProject[i].pID;
  this.http.post('/api/userProject/push',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  })
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


