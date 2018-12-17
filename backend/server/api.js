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
      user:"root",
      password:"yyy",
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
    log(results);
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
  res.json({status:1});
});

//文件上传
router.post('/api/ajaxUpload', function(req, res) {
    log(1);
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
      var avatarName=files.imageIcon.name;
      console.log(avatarName);
      //图片写入地址；
      var newPath = form.uploadDir + avatarName;
      //显示地址；
      var showUrl =domain+'/upload/homeSchedule/'+avatarName;
      console.log("newPath",newPath);
      //console.log(showUrl);
      console.log(files.imageIcon.path);
      fs.renameSync(files.imageIcon.path, newPath);  //重命名
      console.log(showUrl);
      res.send(showUrl);
      //res.json('/avatar'+avatarName);
    });
});

app.use(router);

app.listen(8000);





