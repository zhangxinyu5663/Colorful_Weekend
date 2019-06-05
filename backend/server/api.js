const express=require('express');
const mysql=require('mysql');
var bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const log=console.log;
const formidable=require('formidable');
        fs = require('fs'),
        TITLE = 'formidable上传示例',
        AVATAR_UPLOAD_FOLDER = './public/upload/',
        domain = "http://192.168.204.144:8000";

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));

const connection = mysql.createConnection({
      host:"localhost",
      user:"master",
      password:"master2018",
      database:"weekend"
});
connection.connect();

router.get('/api/info',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  })
});

router.post('/api/freezeUser',function(req,res){
  const sql='update login set userStatus=? where ID=?';
  connection.query(sql,['已冻结',req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results); 
    res.json({'info':'冻结成功'});
  });    
});

router.post('/api/unfreezeUser',function(req,res){
  const sql='update login set userStatus=? where ID=?';
  connection.query(sql,['正常',req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results); 
    res.json({'info':'解冻成功'});
  });    
});

router.post('/api/check',function(req,res){
  const sql='select info.*,head,userName,phoneNumber from info,mine,login where mine.ID=info.ID and info.ID=login.ID and info.ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  });
});

router.post('/api/login',function(req,res){
  const sql='select password from administrator where userName=?';
  connection.query(sql,[req.body.user],function(err,results){
    if(err){
     console.error(err);
      process.exit(1);
    }      
    if(results[0]==undefined){
      res.json({status:0}); //该用户名不存在
    }else if(req.body.pwd==results[0].password){
      res.json({status:1}); //验证成功
    }else{
      res.json({status:2}); //密码错误 验证失败
    }  
  });
});

router.post('/api/search/phone',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID and login.phoneNumber=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

router.post('/api/search/sex',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID and info.sex=?';
  connection.query(sql,[req.body.sex],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

router.post('/api/searchone/id',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID and info.ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    //log(results);
    res.json(results);    
  });
});

router.post('/api/search/status',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID and login.status=?';
  connection.query(sql,[req.body.lstatus],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    //log(results);
    res.json(results);    
  });
});

router.post('/api/search/userStatus',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID and login.userStatus=?';
  connection.query(sql,[req.body.userStatus],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    //log(results);
    res.json(results);    
  });
});

router.get('/api/activity',function(req,res){
  const sql='select * from mine';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    //log(results);
    res.json(results);
  })
});

router.post('/api/searchtwo/id',function(req,res){
  const sql='select * from mine where ID=?'
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    //log(results);
    res.json(results);    
  });
});

router.get('/api/homeSchedule',function(req,res){
  const sql='select * from homeSchedule';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});

router.post('/api/homeScheduleDetail',function(req,res){
  const sql='select homeScheduleDetail.*,homeSchedule.theme,homeSchedule.time,homeSchedule.title,homeSchedule.img  from homeScheduleDetail,homeSchedule where homeSchedule.hsID=homeScheduleDetail.hsID and homeScheduleDetail.hsID=?';
  connection.query(sql,[req.body.hsID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  })
});

router.post('/api/alterHomeSchedule',function(req,res){
  const sql1='update homeSchedule set theme=?,time=?,title=? where hsID=?';
  connection.query(sql1,[req.body.theme,req.body.time,req.body.title,req.body.hsID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
  });
  const sql2='update homeScheduleDetail set detailTime=?,detail=? where hsdetailID=?';
  connection.query(sql2,[req.body.detailTimeone,req.body.detailone,req.body.doneID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
  });
  const sql3='update homeScheduleDetail set detailTime=?,detail=? where hsdetailID=?';
  connection.query(sql3,[req.body.detailTimetwo,req.body.detailtwo,req.body.dtwoID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
  });
  res.json({status:1}); //修改成功
});

//上传首页推荐背景图
router.post('/api/uploadhsPicture', function(req, res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = AVATAR_UPLOAD_FOLDER+'homeSchedule/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {//解析上传内容
      if (err) {
            res.json(err);
            return;                    
      }
      log(files);
      //var fileName=files.imageIcon.name; //文件名字
      var extName = '';  //后缀名
      console.log(files.imageIcon.type);
      
      switch (files.imageIcon.type) {
         case 'image/pjpeg':
           extName = 'jpg';
           break;
         case 'image/jpeg':
           extName = 'jpg';
           break;
         case 'image/png':
           extName = 'png';
           break;
         case 'image/x-png':
           extName = 'png';
           break;
      }
      console.log(extName);
      
      if(extName.length == 0){
        res.json =({'message':'只支持png和jpg格式图片'});
        return;
      }
     // var avatarName = Date.now() + '.' + extName;
      var fileNameArr=files.imageIcon.name.split('.');
      var fileName=fileNameArr[0]+'.'+extName;
      console.log(fileName);
      //图片写入地址；
      var newPath = form.uploadDir + fileName;
      //显示地址；
      var showUrl =domain+'/upload/homeSchedule/'+fileName;
      console.log("newPath",newPath);
      //console.log(showUrl);
      console.log(files.imageIcon.path);
      fs.renameSync(files.imageIcon.path, newPath);  //重命名
      console.log(showUrl);
      res.send(showUrl);
    });
});

//添加首页推荐日程
router.post('/api/newHomeSchedule',function(req,res){
  var num1,hsID;
  var num2,hsDetailID;

  const sql1='select COUNT(*) numone from homeSchedule';
  connection.query(sql1,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    num1=results[0].numone;
    hsID=11+num1;
    num1=num1+1;
    log(num1);
    log(hsID);

    const sql2='insert into homeSchedule values(?,?,?,?,?,?)';
    connection.query(sql2,[num1,hsID,req.body.theme,req.body.time,req.body.imgUrl,req.body.title],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  
    const sql3='select COUNT(*) numtwo from homeScheduleDetail';
    connection.query(sql3,function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      num2=results[0].numtwo;
      hsDetailID=1+num2;
      log(num2);
      log(hsDetailID);

      const sql4='insert into homeScheduleDetail values(?,?,?,?)';
      connection.query(sql4,[hsDetailID,hsID,req.body.detailTimeone,req.body.detailone],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
      });

      const sql5='insert into homeScheduleDetail values(?,?,?,?)';
      connection.query(sql5,[hsDetailID+1,hsID,req.body.detailTimetwo,req.body.detailtwo],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
      });
    });   
  });
  res.json({status:1});  //添加成功
});

//拿到首页推荐作品
router.get('/api/homeProject',function(req,res){
  const sql='select * from homeRecommend';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});

//拿到系统作品
router.get('/api/officialProject',function(req,res){
  const sql='select * from officialProject';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});

//拿到用户作品
router.get('/api/userProject',function(req,res){
  const sql='select * from myPublish';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});

//查找用户作品详情
router.post('/api/userProjectDetail',function(req,res){
  const sql='select * from myPublish where pID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});


//查找系统作品详情
router.post('/api/officialProjectDetail',function(req,res){
  const sql='select * from officialProject where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//首页作品按照作品ID号搜索+查看推荐作品详情
router.post('/api/searchthree/projectID',function(req,res){
  const sql='select * from homeRecommend where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//首页作品按照用户ID搜索
router.post('/api/searchthree/userID',function(req,res){
  const sql='select * from homeRecommend where userID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//首页作品按照地点查找作品
//router.post('/api/searchthree/place',function(req,res){
 // const sql='select * from homeRecommend where palce=?';
 // connection.query(sql,[req.body.place],function(err,results){
   // if(err){
     // console.error(err);
     // process.exit(1);
   // }     
   // log(results);
    //res.json(results);    
 // });
//});

//用户作品按照作品ID号搜索+查看用户作品详情
router.post('/api/searchfive/projectID',function(req,res){
  const sql='select * from myPublish where pID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//用户作品按照用户ID搜索
router.post('/api/searchfive/userID',function(req,res){
  const sql='select * from myPublish where ID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//用户作品按照地点查找作品
//router.post('/api/searchthree/place',function(req,res){
 // const sql='select * from homeRecommend where palce=?';
 // connection.query(sql,[req.body.place],function(err,results){
   // if(err){
     // console.error(err);
     // process.exit(1);
   // }     
   // log(results);
    //res.json(results);    
 // });
//});


//删除首页作品
router.post('/api/homeProject/delete',function(req,res){
  const sql='delete from homeRecommend where projectID=?';

  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});

//删除系统作品
router.post('/api/officialProject/delete',function(req,res){
  const sql='delete from officialProject where projectID=?';

  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});
//删除用户作品
router.post('/api/userProject/delete',function(req,res){
  const sql='delete from myPublish where pID=?';

  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});

//推送系统作品到推荐
router.post('/api/officialProject/push',function(req,res){
  const sql1='select * from officialProject where projectID=?';
  const sql2='insert into homeRecommend values(?,?,?,?,?,?,?,?,?)';
  const sql3='delete from officialProject where projectID=?'
  var userID,projectID,imgs,context,zan,keyword,collection,comment,time;

  connection.query(sql1,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log(results[0]);
    userID=0;//0代表系统作品
    projectID=results[0].projectID;
    imgs=results[0].imgs;
    context=results[0].context;
    zan=0;
    keyword=results[0].keyword;
    collection=0;
    comment=0;
    time=results[0].time;
    connection.query(sql2,[0,userID,projectID,imgs,context,zan,keyword,collection,comment],function(err,results){
      //number字段是随便插得，系统推送上去的都是插得0.
      if(err){
        console.log(err);
        process.exit(1);
      }
      connection.query(sql3,[req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({'message':'push success'});
      })
    })
  })
});

//推送用户作品到推荐
router.post('/api/userProject/push',function(req,res){
  const sql1='select * from myPublish where pID=?';
  const sql2='insert into homeRecommend values(?,?,?,?,?,?,?,?,?,?)';
  const sql3='delete from userProject where projectID=?'
  var userID,projectID,imgs,context,zan,keyword,collection,comment,time;

  connection.query(sql1,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log(results[0]);
    userID=results[0].userID;//0代表系统作品
    projectID=results[0].projectID;
    imgs=results[0].imgs;
    context=results[0].context;
    zan=0;
    keyword=results[0].keyword;
    collection=0;
    comment=0;
    time=results[0].time;
    connection.query(sql2,[1,userID,projectID,imgs,context,zan,keyword,collection,comment,time],function(err,results){
      //number字段是随便插得，用户作品推送上去的都是插得1.
      if(err){
        console.log(err);
        process.exit(1);
      }
      connection.query(sql3,[req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({'message':'push success'});
      })
    })
  })
});

//系统作品按照作品ID号搜索
router.post('/api/searchfour/projectID',function(req,res){
  const sql='select * from officialProject where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//系统作品按照地点查找作品
//router.post('/api/searchfour/place',function(req,res){
 // const sql='select * from officialProject where palce=?';
 // connection.query(sql,[req.body.place],function(err,results){
   // if(err){
     // console.error(err);
     // process.exit(1);
   // }     
   // log(results);
    //res.json(results);    
 // });
//});

//上传系统作品图
let showUrl;
router.post('/api/uploadproject', function(req, res) {
    showUrl=[];
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = AVATAR_UPLOAD_FOLDER+'officialProject/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {//解析上传内容
      if (err) {
            res.json(err);
            return;                    
      }
      log(files);
    for(var i=0;i<Object.keys(files).length;i++){  
      //var fileName=files.imageIcon.name; //文件名字
      var extName = '';  //后缀名
     // console.log(files[i].type);
      
      switch (files[i].type) {
         case 'image/pjpeg':
           extName = 'jpg';
           break;
         case 'image/jpeg':
           extName = 'jpg';
           break;
         case 'image/png':
           extName = 'png';
           break;
         case 'image/x-png':
           extName = 'png';
           break;
      }
      console.log(extName);
      
      if(extName.length == 0){
        res.json =({'message':'只支持png和jpg格式图片'});
        return;
      }
     // var avatarName = Date.now() + '.' + extName;
      var fileNameArr=files[i].name.split('.');
      var fileName=fileNameArr[0]+'.'+extName;
      console.log(fileName);
      //图片写入地址；
      var newPath = form.uploadDir + fileName;
      //显示地址；
      showUrl[i] =domain+'/upload/officialProject/'+fileName;
      console.log("newPath",newPath);
      //console.log(showUrl);
      console.log(files[i].path);
      fs.renameSync(files[i].path, newPath);  //重命名
      console.log(showUrl);
    }
      res.send(showUrl);
  });
});

//创建系统作品
router.post('/api/officialProject/create',function(req,res){
  var getRandom=function(){
    var arr=new Array();
    for(var j=1;j<=8;j++){
      arr.push(j);
    }
    var len=arr.length;
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
    }
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);
  }
  var randomHRID=getRandom(); //首页推荐作品ID
  const sql1='select * from officialProject where projectID=?';
  connection.query(sql1,[randomHRID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    while(rlen!=0){
      randomHRID=getRandom();
      return connection.query(sql1,[randomHRID],function(err,results){
        if(err){
          connsole.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  var count;
  const sql2='select COUNT(*) num from officialProject';
  connection.query(sql2,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }    
    count=results[0].num+1;
    var imgs=showUrl.join('|');
    const sql='insert into officialProject values(?,?,?,?,?,?,?,?)';
    connection.query(sql,[count,randomHRID,imgs,req.body.context,0,req.body.keyword,0,0],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }     
      //log(results);
      res.json({status:1}); //添加成功    
    });
  });
});

//拿到所有评论
router.get('/api/comment',function(req,res){
  const sql='select * from comment';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});
//按照作品ID号搜索评论
router.post('/api/searchnine/projectID',function(req,res){
  const sql='select * from comment where ProjectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});
//按照用户ID搜索评论
router.post('/api/searchnine/userID',function(req,res){
  const sql='select * from comment where CommentUserID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});
//删除评论
router.post('/api/comment/delete',function(req,res){
  const sql='delete from comment where RowGuid=?';

  connection.query(sql,[req.body.RowGuid],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});

app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
              res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
                  res.header("X-Powered-By",' 3.2.1')
      res.header("Content-Type", "application/json;charset=utf-8");
    next();

});

app.use(router);

app.listen(8000);


