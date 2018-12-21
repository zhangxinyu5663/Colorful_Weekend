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
      user:"root",
      password:"yyy",
      database:"weekend"
});
connection.connect();

//登录
router.post('/api/login',function(req,res){
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.json({"name":"zhang"});
  
  const sql='select password,ID,userStatus from login where phoneNumber=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(results[0]);
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
  var num,id;
  const sql1='select COUNT(*) num from login';
  connection.query(sql1,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results);
    num=results[0].num;
    id=111111+num;
    num=num+1;
    log(num);
    log(id); 
    
    const sql2='insert into login values(?,?,?,?,?,?)';
    connection.query(sql2,[num,req.body.phone,req.body.pwd,id,'正常','未登录'],function(err,results){
      if(err){
       console.error(err);
        process.exit(1);
      }
      //log(results); 
      res.json({status:1});  //注册成功
    });

    const sql3='insert into mine values(?,?,?,?,?,?,?,?)';
    connection.query(sql3,[num,id,'您还没有登录名哦','../assets/imgs/head/kong.png',0,0,0,0],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql4='insert into info values(?,?,?,?,?,?,?,?)';
    connection.query(sql4,[num,id,'','','','','',''],function(err,results){
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
  const sql='select * from mine where ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results); 
    res.json(results);
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

//查询我的日程
router.post('/api/mySchedule',function(req,res){
  const sql='select * from mySchedule where ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  });
});

router.post('/api/mySchedule/year',function(req,res){
  const sql='select distinct year from mySchedule where ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    log(results);
    res.json(results);
  });
});

//查询个人信息
router.post('/api/info',function(req,res){
  const sql='select info.*,userName from info,mine where info.ID=mine.ID and info.ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(results);
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
  const sql='insert into mySchedule values(?,?,?,?,?)';
  connection.query(sql,[req.body.type,req.body.year,req.body.date,req.body.detail,req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //添加成功
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
  const sql = "select homeRecommend.*,mine.userName,head from homeRecommend,info,mine where homeRecommend.userID=info.ID and info.ID=mine.ID";

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

//请求首页详情和首页作品评论
router.post('/api/homedetail',function(req,res){
  const sql1 = "select homeRecommend.*,mine.userName,head from homeRecommend,info,mine where homeRecommend.userID=info.ID and info.ID=mine.ID and projectID=?";
  const sql2 = "select comment.*,mine.userName,head from comment,info,mine where comment.CommentUserID=info.ID and info.ID=mine.ID and projectID=?";
  var detail,comments;

  connection.query(sql1,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    detail=results;
  });
  connection.query(sql2,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    comments=results;
    res.json({"detail":detail,"comments":comments});
  });
});


//添加评论
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
  });
});
*/

//用户上传作品
router.post('/api/userPublishUpload',function(req,res){
  var imgData=req.body.avatar;

  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  var uploadUrl='./public/upload/userPublish/';
  var num;
  var pID=22222220;

  const sql1='select COUNT(*) num from myPublish where ID=?';
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    num=results[0].num;
    num=num+1;
    pID=pID+num;
    console.log(num,pID);

    var filename=req.body.userID+'-'+num+'.png';
    fs.writeFile('./public/upload/userPublish/'+filename,dataBuffer,function(err){
    // console.log(req.body.avatar);
      if(err){
        console.error(err);
        process.exit(1);
      }
      console.log('success');
    });

    var imgUrl='http://192.168.204.144:8080/upload/userPublish/'+filename;
    const sql2='insert into myPublish values(?,?,?,?,?,?,?,?)';
    connection.query(sql2,[pID,req.body.userID,req.body.time,imgUrl,req.body.text,0,0,0],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      //console.log('insert success');
      res.json({status:1}); //发表成功
    });

  });

});

//请求用户发布的作品信息
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

app.use(router);

app.listen(8080);


