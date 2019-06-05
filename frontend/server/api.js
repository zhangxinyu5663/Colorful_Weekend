const express=require('express');
const mysql=require('mysql');
var bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const log=console.log;
const fs=require('fs');

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));

app.use(express.static('./public'));
const connection = mysql.createConnection({
      host:"localhost",
      user:"master",
      password:"master2018",
      database:"weekend"
});
connection.connect();

//登录验证
router.post('/api/login',function(req,res){
  const sql='select password,ID,userStatus from login where phoneNumber=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //console.log(results);  一个对象数组
    //console.log(results[0]);
    if(results[0]==undefined){
      res.json({status:0});  //该手机号未被注册过
    }else{
      results.forEach(function(e){
        if(e.userStatus==='已冻结'){
          res.json({status:1}); //账号被冻结 不能登录
        }else if(req.body.pwd===e.password){
          res.json({status:2,id:e.ID});  //密码正确
        }else{
          res.json({status:3}); //密码错误
      }
    });
  }
       
    //res.json(results);:
  })
});

//验证手机号
router.post('/api/phoneVerify',function(req,res){
  const sql='select * from login where phoneNumber=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
   // log(results); 
    if(results[0]!==undefined){
      res.json({status:0}); //该手机号被注册过
    }else{
      res.json({status:1}); //正确 注册成功
    }
    //res.json(results);
  });    
});

//注册
router.post('/api/register',function(req,res){
  var num;
  var getRandom=function(){ //生成作品ID
    var arr=new Array();
    for(var j=1;j<=6;j++){
      arr.push(j);
    }

    var len=arr.length;
    //console.log(len);
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
      //arr.splice(r,1);
    }
    //console.log(result.length);
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);
  }
  var randomUserID=getRandom(); //我的用户ID
  
  const sql1='select * from login where ID=?';              
  connection.query(sql1,[randomUserID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    while(rlen!=0){
      randomUserID=getRandom();
      return connection.query(sql1,[randomUserID],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  const sql2='select COUNT(*) num from login';
  connection.query(sql2,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results);
    num=results[0].num;
    //id=111111+num;
    num=num+1;
    log(num);
    //log(id); 
    
    const sql3='insert into login values(?,?,?,?,?,?)';
    connection.query(sql3,[num,req.body.phone,req.body.pwd,randomUserID,'正常','未登录'],function(err,results){
      if(err){
       console.error(err);
        process.exit(1);
      }
      //log(results); 
      res.json({status:1});  //注册成功
    });

    const sql4='insert into mine values(?,?,?,?,?,?,?,?)';
    connection.query(sql4,[num,randomUserID,'您还没有登录名哦','../assets/imgs/head/kong.png',0,0,0,0],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql5='insert into info values(?,?,?,?,?,?,?,?)';
    connection.query(sql5,[num,randomUserID,'','','','','',''],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });  
  });
});

//忘记密码-修改密码
router.post('/api/changePwd',function(req,res){
  const sql='update login set password=? where phoneNumber=?';
  connection.query(sql,[req.body.pwd,req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results); 
    res.json({status:1}); //修改密码成功
  });    
});

//重新设置密码
router.post('/api/changePwdtwo',function(req,res){
  const sql='update login set password=? where ID=?';
  connection.query(sql,[req.body.pwd,req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results); 
    res.json({status:1}); //修改密码成功
  });    
});


//查询我的表
router.post('/api/mine',function(req,res){
  var collectNum,zanNum,attentionNum,fansNum,publishNum;
  const sql="select * from mine where ID=?"

  const sql1='select COUNT(*) from myPublish where ID=?';
  
  const sql2='select COUNT(*) num from collect where userID=?';

  const sql3='select COUNT(*) num from attention where userID=?';

  const sql4='select COUNT(*) num from attention where TouserID=?';

  const sql5='select COUNT(*) num from zan where userID=?';

  const sql6='update mine set collect=?,zan=?,interest=?,fans=?,publish=? where ID=?';
  connection.query(sql2,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    collectNum=results[0].num;
    connection.query(sql3,[req.body.id],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      attentionNum=results[0].num;
      connection.query(sql4,[req.body.id],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        fansNum=results[0].num;
        connection.query(sql5,[req.body.id],function(err,results){
          if(err){
            console.error(err);
            process.exit(1);
          }
          zanNum=results[0].num;
          connection.query(sql6,[collectNum,zanNum,attentionNum,fansNum,publishNum,req.body.id],function(err,results){
            if(err){
              console.error(err);
              process.exit(1);
            }
            connection.query(sql1,[req.body.id],function(err,results){
              if(err){
                console.error(err);
                process.exit(1);
              }
              publishNum=results[0].num;
              connection.query(sql,[req.body.id],function(err,results){
                if(err){
                  console.error(err);
                  process.exit(1);
                }
                res.json(results);
              });    
            });    
          }); 
        });
      });
    });
  });
 
});

//查询首页推荐日程
router.get('/api/homeSchedule',function(req,res){
  const sql='select * from homeSchedule';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  })
});

//查询首页推荐日程详情
router.post('/api/homeScheduleDetail',function(req,res){
  const sql='select homeScheduleDetail.*,title,bkimg from homeScheduleDetail,homeSchedule where homeScheduleDetail.hsID=? and homeScheduleDetail.hsID=homeSchedule.hsID';
  connection.query(sql,[req.body.hsID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  });
});

//查询我的日程
router.post('/api/mySchedule',function(req,res){
  const sql='select * from mySchedule where ID=? order by date desc';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  });
});

//查询特定年份对应的日程
router.post('/api/mySchedule/year',function(req,res){
  const sql='select * from mySchedule where ID=? and date like ?';
  connection.query(sql,[req.body.userID,req.body.typeTxt+'%'],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    log(results);
    res.json(results);
  })
});


//查询个人信息
router.post('/api/info',function(req,res){
  const sql='select info.*,userName from info,mine where info.ID=mine.ID and info.ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  })
})

//设置个人信息
router.post('/api/setInfo',function(req,res){
  const sql='update info set sex=?,birthday=?,college=?,Email=?,address=?,introduction=? where ID=?';
  connection.query(sql,[req.body.sex,req.body.birthday,req.body.college,req.body.email,req.body.address,req.body.introduction,req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //res.json({status:1}); //修改信息成功
  });
  const sql2='update mine set userName=? where ID=?';
  connection.query(sql2,[req.body.userName,req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
  });
  res.json({status:1});
})

//添加我的日程
router.post('/api/addMySchedule',function(req,res){ 
  //console.log(req.body.userID);
  var getRandom=function(){ //生成作品ID
    var arr=new Array();
    for(var j=1;j<=8;j++){
      arr.push(j);
    }

    var len=arr.length;
    //console.log(len);
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
      //arr.splice(r,1);
    }
    //console.log(result.length);
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);
  }
  var randomSID=getRandom(); //我的日程ID
  
  const sql1='select * from mySchedule where scheduleID=?';              
  connection.query(sql1,[randomSID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    while(rlen!=0){
      randomSID=getRandom();
      return connection.query(sql1,[randomSID],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  const sql2='insert into mySchedule values(?,?,?,?,?)';
  connection.query(sql2,[req.body.userID,randomSID,req.body.type,req.body.date,req.body.detail],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //添加成功
  });
});

//删除我的日程
router.post('/api/delmySchedule',function(req,res){
  const sql='delete from mySchedule where scheduleID=?';
  connection.query(sql,[req.body.sID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});  //删除成功
  });
});

//查询特定的我的日程
router.post('/api/specific/userSchedule',function(req,res){
  const sql='select * from mySchedule where scheduleID=?';
  connection.query(sql,[req.body.sID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//修改我的日程
router.post('/api/update/userSchedule',function(req,res){
  const sql='update mySchedule set type=?,detail=?,date=? where scheduleID=? and ID=?';
  connection.query(sql,[req.body.type,req.body.detail,req.body.date,req.body.sID,req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //修改成成功
  });
});


//查询手机号
router.post('/api/queryPhone',function(req,res){ 
  const sql='select phoneNumber from login where ID=?'
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); //返回查询的结果
  });
});

//查询密码
router.post('/api/queryPwd',function(req,res){ 
  const sql='select password from login where ID=?'
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); //返回查询的结果
  });
});

//查询头像
router.post('/api/queryHead',function(req,res){ 
  const sql='select head,userName from mine where ID=?'
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); //返回查询的结果
  });
});


//更换手机号
router.post('/api/changePhone',function(req,res){ 
  const sql='update login set phoneNumber=? where ID=?'
  connection.query(sql,[req.body.phone,req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //更换手机号成功
  });
});


//请求首页作品
router.get('/api/home',function(req,res){
  const sql = "select homeRecommend.*,mine.userName,head from homeRecommend,info,mine where homeRecommend.userID=info.ID and info.ID=mine.ID order by zan desc";

  connection.query(sql,function(err,results){
    if(err){
      log(err);
      process.exit(1);
    }
    results.forEach(function(e){
      //log(e);
    })
    res.json(results);
   });
});

//请求首页推荐详情
router.post('/api/homedetail',function(req,res){
  const sql= "select homeRecommend.*,mine.userName,head from homeRecommend,mine where homeRecommend.userID=mine.ID and projectID=?";
  var detail;

  connection.query(sql,[req.body.hdID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    detail=results;
    res.json({"detail":detail});
  });
});

//请求所有评论
router.post('/api/comments',function(req,res){
  const sql = "select comment.*,mine.userName,head from comment,mine where comment.CommentUserID=mine.ID and projectID=? order by CommentDate desc";
  var comments;

  connection.query(sql,[req.body.hdID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    comments=results;
    res.json({"comments":comments});
  });
});

//添加评论
router.post('/api/addComment',function(req,res){
  const sql="select userID from homeRecommend where projectID=?";
  const sql1 = "insert into comment values(uuid(),null,?,?,?,?,?)";
  const sql2 = "select head,userName from mine where ID=?";
  const sql3="update homeRecommend set comment=? where projectID=?";
  var toUserID;
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.log(err);
      project.exit(1);
    }
    toUserID=results[0].userID;
    //console.log(toUserID);
    connection.query(sql1,[req.body.context,req.body.userID,req.body.date,toUserID,req.body.projectID],function(err,results){
      if(err){
        console.log(err);
        project.exit(1);
      }
      connection.query(sql3,[req.body.commentnum,req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          project.exit(1);
        }
        res.json(results[0]);
      });
      res.json({status:1}); //评论添加成功
    });
  });
})

//回复评论
/*
router.post('/api/addcomment',function(req,res){
  const sql1 = "insert into comment values(uuid(),?,?,?,now(),?,?)";
  const sql2 = "select CommentUserID from comment where RowGuid=?";
  var ToUserID;

  connection.query(sql2,[req.body.RowGuid],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    console.log(results);
    ToUserID=results[0].CommentUserID;
    console.log(ToUserID);

  connection.query(sql1,[req.body.RowGuid,req.body.context,req.body.userID,ToUserID,req.body.projectID],function(err,results){
    console.log(ToUserID);
    if(err){
      console.log(err);
      project.exit(1);
    }
    console.log(results);
    res.json({"message":"sucessful"});
  });

})
});
*/

//我评论的和评论我的。
router.post('/api/comment',function(req,res){
  const sql1="select comment.CommentText,CommentDate,comment.ProjectID,mine.head,userName,homeRecommend.imgs from comment,mine,homeRecommend where comment.CommentUserID=mine.ID and comment.CommentUserID=? and comment.ProjectID=homeRecommend.projectID order by CommentDate desc"; 
  const sql2="select comment.CommentText,comment.ProjectID,CommentDate,mine.head,userName,homeRecommend.imgs from homeRecommend,comment,mine where comment.ToUserID=? and mine.ID=comment.CommentUserID and homeRecommend.projectID=comment.ProjectID;" 

  var Mycomment=[],commentMy=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    Mycomment=results;
    log(Mycomment);
    connection.query(sql2,[req.body.userID],function(err,results){ 
      if(err){
        console.log(err);
        process.exit(1);
      }
      commentMy=results;

      res.json({"commentMy":commentMy,"Mycomment":Mycomment});
    })
  })
});


//搜索功能
router.post('/api/search',function(req,res){
  var str='%'+req.body.searchText+'%';
  const sql="select * from homeRecommend,mine,info where keyword like ? and homeRecommend.userID=mine.ID and mine.ID=info.ID";
  connection.query(sql,[str],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//用户上传头像
router.post('/api/userHeadUpload',function(req,res){
  var imgData=req.body.avatar;

  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  var uploadUrl='./public/upload/userHead/';
  
  var filename=req.body.userID+'.jpg';
  fs.writeFile('./public/upload/userHead/'+filename,dataBuffer,function(err){
    // console.log(req.body.avatar);
    if(err){
      console.error(err);
      process.exit(1);
    }
    //console.log('success');
  });

  var imgUrl='http://47.93.236.222:8001/upload/userHead/'+filename;
  const sql='update mine set head=? where ID=?';
  const sql2='select head from mine where ID=?';
  connection.query(sql,[imgUrl,req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      console.log('头像更换成功');
	 /*
      connection.query(sql2,[req.body.userID],function(err,results){
      	if(err){
	  console.log(err);
          process.exit(1);
	}
	console.log(results);
      });
      */
	res.json({status:1});
    });


});

//用户上传作品
router.post('/api/userPublishUpload',function(req,res){
  var imgData=req.body.avatar;

  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  var uploadUrl='./public/upload/userPublish/';
  //var num;

  var getRandom=function(){ //生成作品ID
    var arr=new Array();
    for(var j=1;j<=8;j++){
      arr.push(j);
    }

    var len=arr.length;
    //console.log(len);
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
      //arr.splice(r,1);
    }
    //console.log(result.length);
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);
  }
  var randomPID=getRandom();
  
  const sql1='select * from myPublish where pID=?';               
  connection.query(sql1,[randomPID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    var i=1;
    while(rlen!=0){
      randomPID=getRandom();
      return connection.query(sql1,[randomPID],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  var num;
  const sql2='select COUNT(*) num from myPublish where ID=?';
  connection.query(sql2,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    num=results[0].num;
    num=num+1;
    //pID=pID+num;
    

    var filename=req.body.userID+'-'+num+'.png';
    fs.writeFile('./public/upload/userPublish/'+filename,dataBuffer,function(err){
    // console.log(req.body.avatar);
      if(err){
        console.error(err);
        process.exit(1);
      }
      //console.log('success');
    });

    var imgUrl='http://47.93.236.222:8001/upload/userPublish/'+filename;
    const sql3='insert into myPublish values(?,?,?,?,?,?,?,?,?,?)';
    connection.query(sql3,[randomPID,req.body.userID,req.body.time,imgUrl,req.body.text,0,0,0,'false','false'],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      //console.log('insert success');
      res.json({status:1}); //发表成功
    });

  });

});

//用户上传文本作品
router.post('/api/userPublishTxt',function(req,res){
  var getRandom=function(){ //生成作品ID
    var arr=new Array();
    for(var j=1;j<=8;j++){
      arr.push(j);
    }

    var len=arr.length;
    //console.log(len);
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
      //arr.splice(r,1);
    }
    //console.log(result.length);
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);
  }
  var randomPID=getRandom();
  const sql='insert into myPublish values(?,?,?,?,?,?,?,?,?,?)';
  connection.query(sql,[randomPID,req.body.userID,req.body.time,req.body.avatar,req.body.text,0,0,0,'false','false'],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //console.log('insert success');
    res.json({status:1}); //发表成功
  });
});

//编辑用户发布的作品
router.post('/api/edit/userPublish',function(req,res){

  var imgData=req.body.avatar;
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  var uploadUrl='./public/upload/userPublish/';

  const sql1='select pictureORvideo from myPublish where pID=? and ID=?';
  connection.query(sql1,[req.body.pID,req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var filename=results[0].pictureORvideo.substring(47,59);
    //console.log(filename);

    fs.writeFile('./public/upload/userPublish/'+filename,dataBuffer,function(err){
    // console.log(req.body.avatar);
      if(err){
        console.error(err);
        process.exit(1);
      }
      //console.log('success');
    });
 
    var imgUrl='http://47.93.236.222:8001/upload/userPublish/'+filename;
    const sql2='update myPublish set pictureORvideo=?,text=? where pID=? and ID=?';
    connection.query(sql2,[imgUrl,req.body.text,req.body.pID,req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1});  //修改成功
    });
  });
});

//请求用户发布的所有作品信息
router.post('/api/userPublish',function(req,res){
 // console.log(req.body.userID);
 
  const sql='select myPublish.*,head,userName from myPublish,mine where myPublish.ID=mine.ID and myPublish.ID=? order by time desc';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
  
});

router.post('/api/specificUserPublish',function(req,res){
  const sql='select * from myPublish where pID=?';
  connection.query(sql,[req.body.pID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//删除用户发表的特定作品
router.post('/api/delUserPublish',function(req,res){
  const sql='delete from myPublish where pID=?';
  connection.query(sql,[req.body.pID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});  //删除用户作品成功
  });
});

//我的作品点赞
router.post('/api/addUserPublishZan',function(req,res){
  const sql='update myPublish set zanflag=?,zan=? where pID=?';
  connection.query(sql,[req.body.zanflag,req.body.zanNum,req.body.userPID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});
  })
});

//取消我的作品点赞
router.post('/api/cancelUserPublishZan',function(req,res){
  //console.log(req.body.userPID,req.body.zanflag,req.body.zanNum);
  
  const sql='update myPublish set zanflag=?,zan=? where pID=?';
  connection.query(sql,[req.body.zanflag,req.body.zanNum,req.body.userPID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});
  })
});

//我的作品收藏
router.post('/api/addUserPublishCollect',function(req,res){
 // console.log(req.body.userPID,req.body.collectflag,req.body.collectNum);
  
  const sql='update myPublish set collectflag=?,collect=? where pID=?';
  connection.query(sql,[req.body.collectflag,req.body.collectNum,req.body.userPID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});
  })
});

//取消我的作品收藏
router.post('/api/cancelUserPublishCollect',function(req,res){
  //console.log(req.body.userPID,req.body.collectflag,req.body.collectNum);
  
  const sql='update myPublish set collectflag=?,collect=? where pID=?';
  connection.query(sql,[req.body.collectflag,req.body.collectNum,req.body.userPID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});
  })
});


//点击添加点赞数，记录点赞详情：给哪个作品点赞的，点赞者是谁，被点赞的是谁
router.post('/api/home/addZan',function(req,res){
  const sql1="select userID from homeRecommend where projectID=?";
  const sql2="insert into zan values(?,?,?,now())";
  const sql3="update homeRecommend set zan=? where projectID=?";
  const sql4="select * from zan where projectID=? and userID=?";
  var ToUserID;
  var len;

  connection.query(sql1,[req.body.projectID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    ToUserID=results[0].userID; //被点赞的用户ID
    connection.query(sql4,[req.body.projectID,req.body.userID],function(err,results){
      if(err){
        log(err);
        process.exit(1);
      }
      console.log(results);
      len=results.length;
      if(len==0){
        connection.query(sql2,[req.body.userID,req.body.projectID,ToUserID],function(err,results){
          if(err){
            console.log(err);
            process.exit(1);
          }
          connection.query(sql3,[req.body.zanNum,req.body.projectID],function(err,results){
            if(err){
              console.log(err);
              process.exit(1);
            }
            res.json({"message":"success"});
          });
        });
      }
    });
  });
});


//点击删除点赞数
router.post('/api/home/delzan',function(req,res){
  const sql1="select userID from homeRecommend where projectID=?";
  const sql2="delete from zan where projectID=? and userID=? and ToUserID=?";
  const sql3="update homeRecommend set zan=? where projectID=?";
  var ToUserID;

  connection.query(sql1,[req.body.projectID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    ToUserID=results[0].userID;
    
    connection.query(sql2,[req.body.projectID,req.body.userID,ToUserID],function(err,results){
      if(err){
        console.log(err);
        process.exit(1);
      }
      connection.query(sql3,[req.body.zanNum,req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({"message":"success"});
      })
    })

  })
});

//我赞过的和赞过我的详情
router.post('/api/zan',function(req,res){
  const sql1="select imgs,zan,zan.projectID from homeRecommend,zan where homeRecommend.projectID=zan.projectID and zan.userID=? order by time desc"; 
  const sql2="select imgs,zan,zan.* from homeRecommend,zan where homeRecommend.projectID=zan.projectID and zan.ToUserID=? order by time desc";
  
  var Myzan=[],zanMy=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    Myzan=results;
    connection.query(sql2,[req.body.userID],function(err,results){ 
      if(err){
        console.log(err);
        process.exit(1);
      }
      zanMy=results;

      res.json({"zanMy":zanMy,"Myzan":Myzan});
    })
  })
});

//记录收藏的作品
router.post('/api/homedetail/collect',function(req,res){
  //var collectNum;
  //const sql1='update mine set collect=? where ID=?';
  const sql2="insert into collect values(?,?,now())";
  const sql3="update homeRecommend set collection=? where projectID=?";
  const sql4="select * from collect where projectID=? and userID=?";
  //const sql5='select COUNT(*) num from collect';
  var len;

connection.query(sql4,[req.body.projectID,req.body.userID],function(err,results){
   if(err){
    log(err);
    process.exit(1);
   }
   //console.log(results);

   len=results.length;
   console.log(len);

   if(len==0){  
    connection.query(sql2,[req.body.userID,req.body.projectID],function(err,results){
      if(err){
        console.log(err);
        process.exit(1);
      }
     // console.log("successful");
     
      connection.query(sql3,[req.body.collectionNum,req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({"message":"success"});
      });
    });
   }
  });
});

//点击删除收藏数
router.post('/api/homedetail/delcollect',function(req,res){
  const sql2="delete from collect where projectID=? and userID=?";
  const sql3="update homeRecommend set collection=? where projectID=?";

    connection.query(sql2,[req.body.projectID,req.body.userID],function(err,results){
      if(err){
        console.log(err);
        process.exit(1);
      }
      //console.log("del success");

      connection.query(sql3,[req.body.collectionNum,req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({"message":"success"});
      })
    })
});

//请求我收藏的所有作品
router.post('/api/my/collect',function(req,res){
  const sql1="select imgs,collection,collect.projectID from homeRecommend,collect where homeRecommend.projectID=collect.projectID and collect.userID=? order by time desc"; 
  
  var Mycollect=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    Mycollect=results;

    res.json({"Mycollect":Mycollect});
  })

});

//请求特定的收藏作品
router.post('/api/my/specificCollection',function(req,res){
  const sql='select * from collect where userID=? and projectID=?';
  connection.query(sql,[req.body.userID,req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
   // console.log(results);
    if(results.length==0){
      res.json({status:0}); //该作品没被收藏过
    }
    else{
      res.json({status:1}); //该作品被收藏过
    }
  });
});
        
//请求特定的赞过的作品
router.post('/api/my/specificZan',function(req,res){
  const sql='select * from zan where userID=? and projectID=?';
  connection.query(sql,[req.body.userID,req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //console.log(results);
    if(results.length==0){
      res.json({status:0}); //该作品没被赞过
    }
    else{
      res.json({status:1}); //该作品被赞过
    }
  });
});

//判断发表作品的人是否被关注过
router.post('/api/my/specificAttention',function(req,res){
  log(req.body.homedetailUserID);
  const sql='select * from attention where userID=? and ToUserID=?';
  connection.query(sql,[req.body.userID,req.body.homedetailUserID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log(results);
    if(results.length==0){
      res.json({status:0}); //该作者没被关注过
    }
    else{
      res.json({status:1}); //该作者被关注过
    }
  });
});


//关注用户
router.post('/api/homedetail/AttentUser',function(req,res){
  const sql2="insert into attention values(?,?,now())";
  //const sql3="update user set collect=collect+1 where ID=?";
  const sql4="select * from attention where userID=? and ToUserID=?";
  var len;
  console.log(req.body.ToUserID);
  connection.query(sql4,[req.body.userID,req.body.ToUserID],function(err,results){
   if(err){
    log(err);
    process.exit(1);
   }
   console.log(results);
   len=results.length;
   console.log(len);

    if(len==0){    
      connection.query(sql2,[req.body.userID,req.body.ToUserID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        console.log("secussful");
        /*
        connection.query(sql3,[req.body.userID],function(err,results){
         if(err){
           console.log(err);
           process.exit(1);
         }
         res.json({"message":"success"});
        });
        */
      });
    }
  });
});

//取消关注用户
router.post('/api/homedetail/delAttentUser',function(req,res){
  const sql2="delete from attention where userID=? and ToUserID=?";
  //const sql3="update user set collect=collect-1 where ID=?";
  const sql4="select * from attention where userID=? and ToUserID=?";
  var len;

  log("ID是：",req.body.userID,req.body.ToUserID);
  connection.query(sql4,[req.body.userID,req.body.ToUserID],function(err,results){
   if(err){
    log(err);
    process.exit(1);
   }
   console.log(results);
   len=results.length;
   console.log(len);

    if(len>0){    
      connection.query(sql2,[req.body.userID,req.body.ToUserID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        console.log("secussful");
        /*
        connection.query(sql3,[req.body.userID],function(err,results){
         if(err){
           console.log(err);
           process.exit(1);
         }
         res.json({"message":"success"});
        });
        */
      });
    }
  });
});

//我关注的所有用户
router.post('/api/my/attentUser',function(req,res){
  log(req.body.userID);
  const sql1="select mine.ID,head,userName,info.introduction from mine,info,attention where attention.userID=? and attention.ToUserID=mine.ID and attention.ToUserID=info.ID order by time desc";  
  
  var Myattention=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    //console.log(results);
    Myattention=results;

    res.json({"Myattention":Myattention});
  })

});

//查看我的粉丝
router.post('/api/my/fans',function(req,res){
  const sql1="select mine.ID,head,userName,info.introduction,attention.time from mine,info,attention where attention.ToUserID=? and attention.userID=mine.ID and attention.userID=info.ID order by time desc";  
  
  var fans=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    //console.log(results);
    fans=results;

    res.json({"fans":fans});
  })

});

//关注的用户的作品详情
router.post('/api/my/userDetail',function(req,res){
  const sql="select mine.ID,head,userName,homeRecommend.* from mine,homeRecommend where mine.ID=? and mine.ID=homeRecommend.userID"; 
  var userDetail=[];
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
	  console.log('results:',results);
    if(results[0]===undefined){
	    
      console.log('该用户未在首页发表过作品');
      /*
      const sql1="select mine.ID,head,userName,myPublish.* from mine,myPublish where mine.ID=? and mine.ID=myPublish.ID";
      connection.query(sql1,[req.body.userID],function(err,results){
	if(err){
	  console.log(err);
		process.exit(1);
	}
	userDetail=results;      
        res.json({"userDetail":userDetail});
      });
      */
      const sql1="select mine.ID,head,userName from mine  where mine.ID=?";
      connection.query(sql1,[req.body.userID],function(err,results){
	if(err){
	  console.log(err);
		process.exit(1);
	}
	userDetail=results;      
        res.json({"userDetail":userDetail});
      });
    }else{
      userDetail=results;
      res.json({"userDetail":userDetail});
    }	
  })

});

//查看用户个人信息
router.post('/api/userInfo',function(req,res){
  const sql1="select info.*,mine.userName,head from info,mine where info.ID=? and info.ID=mine.ID";

  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    res.json({'userInfo':results});
  })
});

app.use(router);

app.listen(8001);


