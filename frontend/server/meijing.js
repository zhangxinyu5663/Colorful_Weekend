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
  const sql2 = "select comment.*,user.userName,head from comment,user where comment.CommentUserID=user.ID and projectID=? order by CommentDate";
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
router.post('/api/majorcomment',function(req,res){
  const sql1 = "insert into comment values(uuid(),null,?,?,now(),null,?)";
  const sql2 = "select head,userName from user where ID=?"
  connection.query(sql1,[req.body.context,req.body.userID,req.body.projectID],function(err,results){
  
    if(err){
      console.log(err);
      project.exit(1);
    }
    connection.query(sql2,[req.body.userID],function(err,results){
      if(err){
        console.log(err);
        project.exit(1);
      }
    console.log(results[0]);
    res.json(results[0]);
    })
  });

})

//回复评论
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
//我评论的和评论我的。
router.post('/api/comment',function(req,res){
  const sql1="select comment.CommentText,CommentDate,user.head,userName,homeRecommend.imgs from comment,user,homeRecommend where comment.CommentUserID=user.ID and comment.CommentUserID=? and comment.ProjectID=homeRecommend.projectID"; 
  const sql2="select comment.CommentText,CommentDate,user.head,userName,homeRecommend.imgs from homeRecommend,comment,user where homeRecommend.userID=? and user.ID=homeRecommend.userID and homeRecommend.projectID=comment.ProjectID" 

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
//关注用户
router.post('/api/homedetail/AttentUser',function(req,res){
  const sql2="insert into attention values(?,?,now())";
  const sql3="update user set collect=collect+1 where ID=?";
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
        connection.query(sql3,[req.body.userID],function(err,results){
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
//取消关注用户
router.post('/api/homedetail/delAttentUser',function(req,res){
  const sql2="delete from attention where userID=? and ToUserID=?";
  const sql3="update user set collect=collect-1 where ID=?";
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
        connection.query(sql3,[req.body.userID],function(err,results){
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
//我关注的所有用户。
router.post('/api/my/attentUser',function(req,res){
  const sql1="select user.ID,head,userName,userInfo.introduction from user,userInfo,attention where attention.userID=? and attention.ToUserID=user.ID and attention.ToUserID=userInfo.ID order by time desc";  
  
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

})
//关注我的所有用户
router.post('/api/my/fans',function(req,res){
  const sql1="select user.ID,head,userName,userInfo.introduction from user,userInfo,attention where attention.ToUserID=? and attention.userID=user.ID and attention.userID=userInfo.ID order by time desc";  
  
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

})
//关注的用户的作品详情
router.post('/api/my/attentUserDetail',function(req,res){
  const sql1="select user.ID,head,userName,homeRecommend.* from user,homeRecommend where user.ID=? and user.ID=homeRecommend.userID order by time desc"; 
  console.log(1);
  var MyattentionUser=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    console.log(results[0]);
    MyattentionUser=results;

    res.json({"MyattentionUser":MyattentionUser});
  })

})
//查看用户个人信息
router.post('/api/userInfo',function(req,res){
  const sql1="select userInfo.*,user.userName,head from userInfo,user where userInfo.ID=? and userInfo.ID=user.ID";

  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    res.json({'userInfo':results});
  })
})


app.use(router);
app.listen(8080);
