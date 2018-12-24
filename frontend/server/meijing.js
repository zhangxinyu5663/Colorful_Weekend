const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var formidable = require('formidable'),
        fs = require('fs'),
        TITLE = 'formidable上传示例',
        AVATAR_UPLOAD_FOLDER = 'public/avatar/',
        domain = "http://192.168.73.144:8080";

const log = console.log;

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended:true}));

app.use(express.static('./public'));

const connection = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"ddd",
      database:"weekend"
});

connection.connect();

//上传图片
router.post('/api/ajaxUpload', function(req, res) {
    console.log(1);
    
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    //console.log(req.body.fd);
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {//解析上传内容
      if (err) {
            res.json(err);
            return;                    
      }
      console.log(files);
      var extName = '';  //后缀名
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
      var avatarName = Date.now() + '.' + extName;
      console.log(avatarName);
      //图片写入地址；
      var newPath = form.uploadDir + avatarName;
      //显示地址；
      var showUrl =domain+'/avatar/'+avatarName;
      console.log("newPath",newPath);
      console.log(files.imageIcon.path);
      fs.renameSync(files.imageIcon.path, newPath);  //重命名
      console.log(showUrl);
      //res.writeHead(200,{'Content-Type':'text/plain'});
      //res.setHeader('Content-Type','text/plain;charset=utf-8');
      res.send(showUrl);
      //res.json('/avatar'+avatarName);
    });
});


//请求首页作品
router.get('/api/home',function(req,res){
  const sql = "select homeRecommend.*,user.userName,head from homeRecommend,user where homeRecommend.userID=user.ID";

  connection.query(sql,function(err,results){
    if(err){
      log(err);
      process.exit(1);
    }
    results.forEach(function(e){
     // log(e);
    })
    res.json(results);
   });
});
//请求首页详情和首页作品评论
router.post('/api/homedetail',function(req,res){
  const sql1 = "select homeRecommend.*,user.userName,head from homeRecommend,user where homeRecommend.userID=user.ID and projectID=?";
  const sql2 = "select comment.*,user.userName,head from comment,user where comment.CommentUserID=user.ID and projectID=?";
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
})

//点击添加点赞数，记录点赞详情：给哪个作品点赞的，点赞者是谁，被点赞的是谁
router.post('/api/home/zan',function(req,res){
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
    ToUserID=results[0].userID;
    //console.log(ToUserID);

    connection.query(sql4,[req.body.projectID,req.body.userID],function(err,results){
      if(err){
        log(err);
        process.exit(1);
      }
      console.log(results);
      len=results.length;
      console.log(len);
      if(len==0){
        connection.query(sql2,[req.body.userID,req.body.projectID,ToUserID],function(err,results){
          if(err){
            console.log(err);
            process.exit(1);
          }
          console.log("secussful");

          connection.query(sql3,[req.body.zanNum,req.body.projectID],function(err,results){
            if(err){
              console.log(err);
              process.exit(1);
            }
            res.json({"message":"success"});
          })
        })
      }
    })
  })
})
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
      console.log("del success");

      connection.query(sql3,[req.body.zanNum,req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({"message":"success"});
      })
    })

  })
})
//我赞过的和赞过我的详情。
router.post('/api/zan',function(req,res){
  const sql1="select imgs,zan,zan.projectID from homeRecommend,zan where homeRecommend.projectID=zan.projectID and zan.userID=? order by time desc"; 
  const sql2="select imgs,zan,zan.projectID from homeRecommend,zan where homeRecommend.projectID=zan.projectID and zan.ToUserID=? order by time desc";
  
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
})
//记录收藏的作品
router.post('/api/homedetail/collect',function(req,res){
  const sql2="insert into collect values(?,?,now())";
  const sql3="update homeRecommend set collection=? where projectID=?";
  const sql4="select * from collect where projectID=? and userID=?";
  var len;


connection.query(sql4,[req.body.projectID,req.body.userID],function(err,results){
   if(err){
    log(err);
    process.exit(1);
   }
   console.log(results);
   len=results.length;
   console.log(len);

   if(len==0){  
    connection.query(sql2,[req.body.userID,req.body.projectID],function(err,results){
      if(err){
        console.log(err);
        process.exit(1);
      }
      console.log("secussful");

      connection.query(sql3,[req.body.collectionNum,req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({"message":"success"});
      })
    })
   }
  })
})

//点击删除收藏数
router.post('/api/homedetail/delcollect',function(req,res){
  const sql2="delete from collect where projectID=? and userID=?";
  const sql3="update homeRecommend set collection=? where projectID=?";

    connection.query(sql2,[req.body.projectID,req.body.userID],function(err,results){
      if(err){
        console.log(err);
        process.exit(1);
      }
      console.log("del success");

      connection.query(sql3,[req.body.collectionNum,req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({"message":"success"});
      })
    })
})
//我收藏的所有作品。
router.post('/api/my/collect',function(req,res){
  const sql1="select imgs,zan,collect.projectID from homeRecommend,collect where homeRecommend.projectID=collect.projectID and collect.userID=? order by time desc"; 
  
  var Mycollect=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    Mycollect=results;

    res.json({"Mycollect":Mycollect});
  })

})

app.use(router);
app.listen(8080);
