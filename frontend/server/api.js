const express=require('express');
const mysql=require('mysql');
var bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const log=console.log;

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));

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



app.use(router);

app.listen(8080);


