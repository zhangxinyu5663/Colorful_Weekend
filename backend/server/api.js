const express=require('express');
const mysql=require('mysql');
var bodyParser=require('body-parser');
const fs=require('fs');
const path=require('path');
const formidable=require('formidable');
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

router.post('/api/check',function(req,res){
  const sql='select info.*,head,userName,phoneNumber from info,mine,login where mine.ID=info.ID and info.ID=login.ID and info.ID=?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    log(results);
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
    log(results);
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
    log(results);
    res.json(results);    
  });
});

router.post('/api/upload',function(req,res){
    var form = new formidable.IncomingForm();   
    form.uploadDir = "./public/upload/temp/"; //改变临时目录   
    console.log(1);
    form.parse(req, function(error, fields, files) {   
        for (var key in files) {   
          var file = files[key];   
          var fName = (new Date()).getTime();   
          switch (file.type) {   
            case "image/jpeg":
              fName = fName + ".jpg";   
              break;   
            case "image/png":   
              fName = fName + ".png";
              break;   
            default:   
              fName = fName + ".png";   
              break;   
          }   
          console.log(file, file.size);
          fs.rename(file.path,file.path+fName,function(err){
            if(err){
              console.log(err);
              process.exit(1);
            }
            res.json({'message':'success'});
          });
        }
    })
});

app.use(router);

app.listen(8000);



